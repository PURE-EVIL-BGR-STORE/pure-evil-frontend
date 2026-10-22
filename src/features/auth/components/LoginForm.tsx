"use client";

import React, { useState } from "react";
import { Eye, EyeOff, ChevronRight, Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { ROUTES } from "@/shared/constants";
import { Input, Button, useToast } from "@/shared/ui";
import { validateEmail, validatePassword } from "../model/validation";
import { authService } from "../services/auth.service";
import { SocialAuthButtons } from "./SocialAuthButtons";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const emailErr = validateEmail(email, locale);
    const passErr = validatePassword(password, locale);
    const newErrors: { email?: string; password?: string } = {};

    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const data = await authService.login({
        email: email.trim(),
        password,
      });

      if (!data.success) {
        toast.error(
          locale === "vi" ? "Đăng nhập thất bại" : "Login Failed",
          data.message || (locale === "vi" ? "Email hoặc mật khẩu không chính xác." : "Invalid credentials.")
        );
        return;
      }

      toast.success(
        locale === "vi" ? "Đăng nhập thành công!" : "Login Successful!",
        locale === "vi" ? "Chào mừng bạn quay trở lại PURE EVIL STORE." : "Welcome back to PURE EVIL STORE."
      );

      setTimeout(() => {
        router.push(ROUTES.HOME);
      }, 700);
    } catch {
      toast.error(
        locale === "vi" ? "Lỗi kết nối" : "Network Error",
        locale === "vi"
          ? "Không thể kết nối đến máy chủ xác thực Keycloak. Vui lòng thử lại sau."
          : "Could not connect to authentication server. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-7 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] font-heading">
          {t("loginTitle")}
        </h2>
        <p className="text-sm text-[#666666] mt-1.5">{t("loginSubtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-1.5">
            {t("email")}
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder={t("emailPlaceholder")}
            error={Boolean(errors.email)}
            disabled={isLoading}
            className="h-11 bg-white text-sm"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
              {t("password")}
            </label>
            <button
              type="button"
              onClick={() =>
                toast.info(
                  locale === "vi" ? "Quên mật khẩu?" : "Forgot password?",
                  locale === "vi"
                    ? "Vui lòng liên hệ quản trị viên hoặc hotline 0906178691 để đặt lại mật khẩu."
                    : "Please contact support or hotline 0906178691 to reset your password."
                )
              }
              className="text-xs font-medium text-[#666666] hover:text-[#C19A6B] transition-colors cursor-pointer"
            >
              {t("forgotPassword")}
            </button>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder={t("passwordPlaceholder")}
              error={Boolean(errors.password)}
              disabled={isLoading}
              className="h-11 bg-white pr-10 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E8E] hover:text-[#111111] transition-colors cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1 font-medium">{errors.password}</p>}
        </div>

        {/* Remember me */}
        <div className="flex items-center justify-between pt-1">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded-[2px] border-black/20 text-[#111111] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#111111]"
            />
            <span className="text-xs text-[#666666] font-medium">{t("rememberMe")}</span>
          </label>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{t("loginButton")}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {/* Switch to Register */}
        <p className="text-center text-xs text-[#666666] pt-2">
          {t("dontHaveAccount")}{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-bold text-[#111111] hover:text-[#C19A6B] transition-colors cursor-pointer underline underline-offset-2"
          >
            {t("signUp")}
          </button>
        </p>

        {/* Social Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/10" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white px-3 text-[#8E8E8E] tracking-widest font-semibold">
              {t("orContinueWith")}
            </span>
          </div>
        </div>

        {/* Google Login Button */}
        <SocialAuthButtons label={t("google")} />
      </form>
    </div>
  );
}
