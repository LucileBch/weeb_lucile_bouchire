import os
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from .models import CustomUser
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.conf import settings

class RegisterViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    Register ViewSet
    Sign Up controller
    """
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(
            {"message": "Compte créé. En attente de validation par l'administrateur."},
            status=status.HTTP_201_CREATED
        )

class MyTokenObtainPairView(TokenObtainPairView):
    """
    Custom Token ViewSet
    Login with authentication controller
    Add tokens in cookies & return user_data
    """
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            jwt_settings = settings.SIMPLE_JWT

            response.set_cookie(
                key=jwt_settings['AUTH_COOKIE'],
                value=response.data.get('access'),
                httponly=jwt_settings['AUTH_COOKIE_HTTP_ONLY'],
                secure=jwt_settings['AUTH_COOKIE_SECURE'],
                samesite=jwt_settings['AUTH_COOKIE_SAMESITE'],
                path='/'
            )

            response.set_cookie(
                key=jwt_settings['AUTH_COOKIE_REFRESH'],
                value=response.data.get('refresh'),
                httponly=jwt_settings['AUTH_COOKIE_HTTP_ONLY'],
                secure=jwt_settings['AUTH_COOKIE_SECURE'],
                samesite=jwt_settings['AUTH_COOKIE_SAMESITE'],
                path='/'
            )

            # Delete tokens from JSON response
            # Not allowing JS to access these infos
            del response.data['access']
            del response.data['refresh']

        return response

class MyTokenRefreshView(TokenRefreshView):
    """
    Custom Refresh ViewSet
    Use refresh_token cookie to create new access_token
    """
    def post(self, request, *args, **kwargs):
        # get refresh_token from cookie
        refresh_token = request.COOKIES.get('refresh_token')
        
        if refresh_token:
            if not request.data:
                request._full_data = {'refresh': refresh_token}
            else:
                if hasattr(request.data, '_mutable'):
                    request.data._mutable = True
                request.data['refresh'] = refresh_token

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            jwt_settings = settings.SIMPLE_JWT

            response.set_cookie(
                key=jwt_settings['AUTH_COOKIE'],
                value=response.data.get('access'),
                httponly=jwt_settings['AUTH_COOKIE_HTTP_ONLY'],
                secure=jwt_settings['AUTH_COOKIE_SECURE'],
                samesite=jwt_settings['AUTH_COOKIE_SAMESITE'],
                path='/'
            )
            
            # If rotation in settings => update refresh cookie
            new_refresh = response.data.get('refresh')
            if new_refresh:
                response.set_cookie(
                    key=jwt_settings['AUTH_COOKIE_REFRESH'],
                    value=new_refresh,
                    httponly=jwt_settings['AUTH_COOKIE_HTTP_ONLY'],
                    secure=jwt_settings['AUTH_COOKIE_SECURE'],
                    samesite=jwt_settings['AUTH_COOKIE_SAMESITE'],
                    path='/'
                )  
                del response.data['refresh']

            del response.data['access']

        return response
    
class LogoutView(APIView):
    """
    Logout View
    Logout user, blacklist refresh token and clean cookies
    """
    def post(self, request):
        # 1. get token from cookie
        refresh_token = request.COOKIES.get('refresh_token')

        if refresh_token:
            try:
                # 2. Blacklist refresh token in DB
                token = RefreshToken(refresh_token)
                token.blacklist()
            except TokenError:
                # ignore if already blacklisted
                pass

        # 3. Response
        response = Response(
            {"message": "Déconnexion réussie"}, 
            status=status.HTTP_200_OK
        )

        jwt_settings = settings.SIMPLE_JWT
        
        # 4. clean cookies
        response.delete_cookie('access_token', path='/', samesite=jwt_settings['AUTH_COOKIE_SAMESITE'])
        response.delete_cookie('refresh_token', path='/api/auth/refresh-token/', samesite=jwt_settings['AUTH_COOKIE_SAMESITE'])

        return response