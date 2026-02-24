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

  // user
  passwordResetRequest: "auth/password-reset-request/",
  passwordResetConfirm: "auth/password-reset-confirm/",
};
