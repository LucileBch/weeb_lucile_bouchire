from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from .models import CustomUser
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

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
                secure=False, # À mettre à True en prod (HTTPS)
                samesite='Lax',
                path='/'
            )

            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=False, # À mettre à True en prod (HTTPS)
                samesite='Lax',
                path='/api/token/refresh/'
            )

            # Delete tokens from JSON response
            # Not allowing JS to access these infos
            del response.data['access']
            del response.data['refresh']

        return response