from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins
from .models import Review
from .serializers import ReviewSerializer

User = get_user_model()
class ReviewViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    Review ViewSet
    POST action only
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        """
        If user authenticated, link user
        If user not authenticated, search user in DB 
        Else save without user        
        """
        user_to_link = None

        if self.request.user.is_authenticated:
            user_to_link=self.request.user

        else:
            email_used = serializer.validated_data.get('email')
            user_to_link = User.objects.filter(email=email_used).first()
        
        serializer.save(author=user_to_link)