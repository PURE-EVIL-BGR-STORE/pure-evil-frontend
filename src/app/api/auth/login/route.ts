import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

// In-memory sliding window rate limiter for login brute-force prevention
const loginAttempts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 5, windowMs = 60 * 1000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record || now > record.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting Check
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 5, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "rate_limit_exceeded",
          message: "Bạn đã thực hiện quá nhiều lần thử đăng nhập. Vui lòng đợi 1 phút trước khi thử lại.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập đầy đủ Email và Mật khẩu." },
        { status: 400 }
      );
    }

    if (!env.keycloakUrl || !env.keycloakRealm || !env.keycloakClientId || !env.keycloakClientSecret) {
      console.error("[AUTH_CONFIG_ERROR] Missing Keycloak environment variables");
      return NextResponse.json(
        { success: false, message: "Máy chủ chưa cấu hình thông tin kết nối xác thực." },
        { status: 500 }
      );
    }

    const tokenEndpoint = `${env.keycloakUrl}/realms/${env.keycloakRealm}/protocol/openid-connect/token`;

    const formParams = new URLSearchParams();
    formParams.append("grant_type", "password");
    formParams.append("client_id", env.keycloakClientId);
    formParams.append("client_secret", env.keycloakClientSecret);
    formParams.append("username", email.trim());
    formParams.append("password", password);
    formParams.append("scope", "openid profile email");

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formParams.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error === "invalid_grant") {
        return NextResponse.json(
          {
            success: false,
            error: data.error,
            message: "Email hoặc mật khẩu không chính xác. Vui lòng thử lại.",
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: data.error || "auth_failed",
          message: data.error_description || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",
        },
        { status: response.status }
      );
    }

    // Authentication Success -> Store secure cookies
    const cookieStore = await cookies();
    cookieStore.set("pure_evil_access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: data.expires_in || 300,
    });

    if (data.refresh_token) {
      cookieStore.set("pure_evil_refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: data.refresh_expires_in || 1800,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Đăng nhập thành công!",
      user: {
        email: email.trim(),
      },
      tokenType: data.token_type,
      expiresIn: data.expires_in,
    });
  } catch (error: unknown) {
    console.error("[AUTH_LOGIN_ERROR]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "connection_error",
        message: "Không thể kết nối đến máy chủ xác thực Keycloak. Vui lòng kiểm tra dịch vụ backend.",
      },
      { status: 503 }
    );
  }
}
