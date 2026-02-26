import os
from rest_framework import viewsets, mixins, status,generics
from rest_framework.response import Response
from .models import CustomUser, PasswordResetCode
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer, ForgotPasswordCodeRequestSerializer, ForgotPasswordConfirmSerializer, UserProfileUpdateSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.conf import settings
from .utils import generate_reset_code
from django.core.mail import send_mail
from rest_framework.permissions import IsAuthenticated

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
    
class ForgotPasswordCodeRequestView(APIView):
    """
    Step 1: Forgot Password
    Verify email, generate 6-digit code and send email
    """
    def post(self, request):
        serializer = ForgotPasswordCodeRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = CustomUser.objects.get(email=email)
            
            # Security: we don't resset a non activ account
            if not user.is_active:
                return Response(
                    {"detail": "Ce compte n'est pas encore activé."},
                    status=status.HTTP_403_FORBIDDEN
                )

            # 1. Clean old code and generate new one
            PasswordResetCode.objects.filter(user=user, is_used=False).delete()
            code_obj = PasswordResetCode.objects.create(
                user=user, 
                code=generate_reset_code()
            )
            
            # 2. Send email with code
            send_mail(
                subject="Réinitialisation de votre mot de passe",
                message=f"Bonjour {user.first_name}, votre code de sécurité est : {code_obj.code}. Il expire dans 15 minutes.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )
            
            return Response(
                {"message": "Un code de validation a été envoyé par email."},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordConfirmView(APIView):
    """
    Step 2: Reset Password
    Verify code and update password
    """
    def post(self, request):
        serializer = ForgotPasswordConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Votre mot de passe a été modifié avec succès."},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileUpdateView(generics.UpdateAPIView):
    serializer_class = UserProfileUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Préparation de la réponse
        response = Response({
            "message": "Profil mis à jour avec succès",
            "user_data": serializer.data
        }, status=status.HTTP_200_OK)

        # Si l'email ou le password a changé, on ré-émet les cookies
        # pour que l'access_token contienne les infos à jour
        if 'email' in request.data or 'new_password' in request.data:
            refresh = RefreshToken.for_user(user)
            jwt_settings = settings.SIMPLE_JWT
            
            # On réutilise la même logique que ton MyTokenObtainPairView
            response.set_cookie(
                key=jwt_settings['AUTH_COOKIE'],
                value=str(refresh.access_token),
                httponly=jwt_settings['AUTH_COOKIE_HTTP_ONLY'],
                secure=jwt_settings['AUTH_COOKIE_SECURE'],
                samesite=jwt_settings['AUTH_COOKIE_SAMESITE'],
                path='/'
            )
            response.set_cookie(
                key=jwt_settings['AUTH_COOKIE_REFRESH'],
                value=str(refresh),
                httponly=jwt_settings['AUTH_COOKIE_HTTP_ONLY'],
                secure=jwt_settings['AUTH_COOKIE_SECURE'],
                samesite=jwt_settings['AUTH_COOKIE_SAMESITE'],
                path='/'
            )

        return response