// ---------- USER RESET PASSWORD DTO ---------- //
export interface UserResetPasswordDto {
  email: string;
  activationCode: string;
  password: string;
}
