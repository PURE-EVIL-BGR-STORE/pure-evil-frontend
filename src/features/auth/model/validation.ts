/**
 * Auth validation helpers
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Tối thiểu 8 ký tự, ít nhất 1 chữ hoa, 1 số, 1 ký tự đặc biệt
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function validateEmail(email: string, locale = "vi"): string | null {
  if (!email.trim()) return locale === "vi" ? "Vui lòng nhập Email." : "Email is required.";
  if (!EMAIL_REGEX.test(email.trim())) return locale === "vi" ? "Định dạng Email không hợp lệ." : "Invalid email format.";
  return null;
}

export function validatePassword(password: string, locale = "vi"): string | null {
  if (!password) return locale === "vi" ? "Vui lòng nhập Mật khẩu." : "Password is required.";
  return null;
}

export function validateRegisterPassword(password: string, locale = "vi"): string | null {
  if (!password) return locale === "vi" ? "Vui lòng nhập Mật khẩu." : "Password is required.";
  if (!PASSWORD_REGEX.test(password)) {
    return locale === "vi"
      ? "Mật khẩu tối thiểu 8 ký tự, gồm ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt."
      : "Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character.";
  }
  return null;
}

export function validateRequired(value: string, fieldName: string, locale = "vi"): string | null {
  if (!value.trim()) return locale === "vi" ? `Vui lòng nhập ${fieldName}.` : `${fieldName} is required.`;
  return null;
}

export function validatePasswordMatch(p1: string, p2: string, locale = "vi"): string | null {
  if (p1 !== p2) return locale === "vi" ? "Mật khẩu xác nhận không khớp." : "Passwords do not match.";
  return null;
}
