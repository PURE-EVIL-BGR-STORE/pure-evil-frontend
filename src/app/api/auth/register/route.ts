import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  try {
    if (!env.apiUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Máy chủ chưa cấu hình NEXT_PUBLIC_API_URL.",
        },
        { status: 500 },
      );
    }

    const body = await request.json();
    const { email, password, firstName, lastName, username } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Vui lòng nhập đầy đủ thông tin: Họ, Tên, Email và Mật khẩu.",
        },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Mật khẩu phải chứa tối thiểu 8 ký tự.",
        },
        { status: 400 },
      );
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message: "Mật khẩu phải bao gồm ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt.",
        },
        { status: 400 },
      );
    }

    const payload = {
      username: (username || email.split("@")[0]).trim(),
      email: email.trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender: "MALE",
      dob: "2000-01-01T00:00:00Z",
    };

    const targetUrl = `${env.apiUrl}/profiles/register`;
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg =
        data.message ||
        data.error ||
        "Đăng ký tài khoản không thành công. Vui lòng kiểm tra lại thông tin.";

      return NextResponse.json(
        {
          success: false,
          code: data.code,
          message: errorMsg,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.",
      result: data.result || data,
    });
  } catch (error: unknown) {
    console.error("[AUTH_REGISTER_ERROR]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "connection_error",
        message:
          "Không thể kết nối đến máy chủ đăng ký profile-service. Vui lòng kiểm tra lại backend.",
      },
      { status: 503 },
    );
  }
}
