// ---------- API ENDPOINTS ---------- //
export const endpoints = {
  // review
  postReview: "/reviews/",

  // article
  articles: "/articles/",

  // auth
  signup: "/auth/signup/",
  login: "/auth/login/",
  logout: "/auth/logout/",
  refreshToken: "/auth/refresh-token/",
  updateUserInfos: "/users/me/",

  // user
  forgotPasswordCodeRequest: "users/forgot-password-code-request/",
  forgotPasswordConfirm: "users/forgot-password-confirm/",
};
