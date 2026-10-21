"use client";

import React, { useState } from "react";
import { Eye, EyeOff, ChevronRight, Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ROUTES } from "@/shared/constants";
import { Input, Button, useToast } from "@/shared/ui";
import {
  validateEmail,
  validateRegisterPassword,
  validateRequired,
  validatePasswordMatch,
  PASSWORD_REGEX,
} from "../model/validation";
import { authService } from "../services/auth.service";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess: (email: string, password: string) => void;
}

export function RegisterForm({
  onSwitchToLogin,
  onRegisterSuccess,
}: RegisterFormProps) {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isConfirmMismatch = confirmPassword.length > 0 && confirmPassword !== password;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const fnErr = validateRequired(firstName, t("firstName"), locale);
    if (fnErr) newErrors.firstName = fnErr;

    const lnErr = validateRequired(lastName, t("lastName"), locale);
    if (lnErr) newErrors.lastName = lnErr;

    const emailErr = validateEmail(email, locale);
    if (emailErr) newErrors.email = emailErr;

    const passErr = validateRegisterPassword(password, locale);
    if (passErr) newErrors.password = passErr;

    const matchErr = validatePasswordMatch(password, confirmPassword, locale);
    if (matchErr) newErrors.confirmPassword = matchErr;

    if (!agreeTerms) {
      newErrors.terms =
        locale === "vi"
          ? "Bạn cần đồng ý với Điều khoản dịch vụ."
          : "You must agree to the Terms of Service.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const data = await authService.register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      });

      if (!data.success) {
        toast.error(
          locale === "vi" ? "Đăng ký không thành công" : "Registration Failed",
          data.message || (locale === "vi" ? "Vui lòng kiểm tra lại thông tin." : "Please check your details.")
        );
        return;
      }

      toast.success(
        locale === "vi" ? "Tạo tài khoản thành công!" : "Account Created Successfully!",
        locale === "vi"
          ? "Hồ sơ của bạn đã được kích hoạt. Hãy đăng nhập để bắt đầu."
          : "Your account is ready. Please log in now."
      );

      onRegisterSuccess(email.trim(), password);
    } catch {
      toast.error(
        locale === "vi" ? "Lỗi kết nối" : "Network Error",
        locale === "vi"
          ? "Không thể kết nối đến máy chủ đăng ký. Vui lòng thử lại sau."
          : "Could not connect to registration server. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] font-heading">
          {t("registerTitle")}
        </h2>
        <p className="text-sm text-[#666666] mt-1.5">{t("registerSubtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-1">
              {t("firstName")}
            </label>
            <Input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
              }}
              placeholder={t("firstNamePlaceholder")}
              error={Boolean(errors.firstName)}
              disabled={isLoading}
              className="h-10 text-sm"
            />
            {errors.firstName && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-1">
              {t("lastName")}
            </label>
            <Input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
              }}
              placeholder={t("lastNamePlaceholder")}
              error={Boolean(errors.lastName)}
              disabled={isLoading}
              className="h-10 text-sm"
            />
            {errors.lastName && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-1">
            {t("email")}
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            placeholder={t("emailPlaceholder")}
            error={Boolean(errors.email)}
            disabled={isLoading}
            className="h-10 text-sm"
          />
          {errors.email && <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-1">
            {t("password")}
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
              }}
              placeholder={t("passwordPlaceholder")}
              error={Boolean(errors.password)}
              disabled={isLoading}
              className="h-10 pr-10 text-sm"
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

          {/* Thông báo mật khẩu: chỉ hiện khi chưa đạt chuẩn. Khi đã ok thì ẩn đi */}
          {errors.password ? (
            <p className="text-[11px] text-red-500 mt-1 font-medium">* {errors.password}</p>
          ) : (
            !PASSWORD_REGEX.test(password) && (
              <p className="text-[11px] text-emerald-600 font-medium mt-1.5">
                * {t("passwordRequirement")}
              </p>
            )
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-1">
            {t("confirmPassword")}
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              placeholder={t("confirmPasswordPlaceholder")}
              error={Boolean(errors.confirmPassword || isConfirmMismatch)}
              disabled={isLoading}
              className="h-10 pr-10 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E8E] hover:text-[#111111] transition-colors cursor-pointer"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {/* Thông báo khớp mật khẩu: khi chưa khớp thì hiện, khi đã khớp (ok) thì ẩn đi */}
          {(errors.confirmPassword || isConfirmMismatch) && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              * {errors.confirmPassword || (locale === "vi" ? "Mật khẩu xác nhận không khớp." : "Passwords do not match.")}
            </p>
          )}
        </div>

        {/* Agree terms */}
        <div className="pt-1">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e.target.checked);
                if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }));
              }}
              className="w-4 h-4 translate-y-[1.5px] rounded-[2px] border-black/20 text-[#111111] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#111111] flex-shrink-0"
            />
            <span className="text-xs text-[#666666] leading-normal select-none">
              {locale === "vi" ? (
                <>
                  Tôi đồng ý với{" "}
                  <Link
                    href={ROUTES.TERMS}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="font-medium text-[#111111] underline underline-offset-2 hover:text-[#C19A6B] transition-colors"
                  >
                    {t("terms")}
                  </Link>{" "}
                  và{" "}
                  <Link
                    href={ROUTES.PRIVACY}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="font-medium text-[#111111] underline underline-offset-2 hover:text-[#C19A6B] transition-colors"
                  >
                    {t("privacy")}
                  </Link>
                  .
                </>
              ) : (
                <>
                  I agree to the{" "}
                  <Link
                    href={ROUTES.TERMS}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="font-medium text-[#111111] underline underline-offset-2 hover:text-[#C19A6B] transition-colors"
                  >
                    {t("terms")}
                  </Link>{" "}
                  and{" "}
                  <Link
                    href={ROUTES.PRIVACY}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="font-medium text-[#111111] underline underline-offset-2 hover:text-[#C19A6B] transition-colors"
                  >
                    {t("privacy")}
                  </Link>
                  .
                </>
              )}
            </span>
          </label>
          {errors.terms && <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.terms}</p>}
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
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>{t("registerButton")}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {/* Switch to Login */}
        <p className="text-center text-xs text-[#666666] pt-1">
          {t("alreadyHaveAccount")}{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-bold text-[#111111] hover:text-[#C19A6B] transition-colors cursor-pointer underline underline-offset-2"
          >
            {t("signIn")}
          </button>
        </p>
      </form>
    </div>
  );
}
