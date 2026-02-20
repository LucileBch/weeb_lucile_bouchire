from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # 1. Check if token is in Header
        header = self.get_header(request)
        if header is not None:
            raw_token = self.get_raw_token(header)
        else:
            # 2. get token from cookie
            raw_token = request.COOKIES.get(settings.SIMPLE_JWT.get('AUTH_COOKIE'))

        if raw_token is None:
            return None

        # 3. validate token
        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token