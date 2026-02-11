from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .serializers import RegisterSerializer

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