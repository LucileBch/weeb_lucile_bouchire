from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # 1. Check if token is in Header
        header = self.get_header(request)
        if header is not None:
            raw_token = self.get_raw_token(header)
            from_cookie = False
        else:
            # 2. get token from cookie
            raw_token = request.COOKIES.get(settings.SIMPLE_JWT.get('AUTH_COOKIE'))
            from_cookie = True

        if raw_token is None:
            return None

        # 3. validate token
        try:
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token
        except AuthenticationFailed:
            # Expired or invalid cookie: request handled as anonymous,
            # public routes stay reachable and protected routes still answer 401
            if from_cookie:
                return None
            raise
