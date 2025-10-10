// might be serializer with Django DRF
// TBC in the next step
export interface UserResetPasswordDto {
  email: string;
  activationCode: string;
  password: string;
}
