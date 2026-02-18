import os
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from .models import CustomUser
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView

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
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=os.getenv('JWT_COOKIE_SECURE', 'False') == 'True',
                samesite='Lax',
                path='/'
            )

            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=os.getenv('JWT_COOKIE_SECURE', 'False') == 'True',
                samesite='Lax',
                path='/api/auth/refresh-token/'
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
            request.data['refresh'] = refresh_token

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')

            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=os.getenv('JWT_COOKIE_SECURE', 'False') == 'True',
                samesite='Lax',
                path='/'
            )
            
            # If rotation in settings => update refresh cookie
            new_refresh = response.data.get('refresh')
            if new_refresh:
                response.set_cookie(
                    key='refresh_token',
                    value=new_refresh,
                    httponly=True,
                    secure=os.getenv('JWT_COOKIE_SECURE', 'False') == 'True',
                    samesite='Lax',
                    path='/api/auth/refresh-token/'
                )  
                del response.data['refresh']

            del response.data['access']

        return response
    
class LogoutView(APIView):
    """
    Logout View
    Logout user and clean tokens in cookies
    """
    def post(self, request):
        response = Response(
            {"message": "Déconnexion réussie"}, 
            status=status.HTTP_200_OK
        )
        
        # warning : path as to be exactly the same from login
        response.delete_cookie(
            'access_token', 
            path='/'
        )
        
        response.delete_cookie(
            'refresh_token', 
            path='/api/auth/refresh-token/'
        )

        return response