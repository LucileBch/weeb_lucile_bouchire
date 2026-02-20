from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Article
from .serializers import ArticleSerializer
from api.permissions import IsAuthorOrReadOnly

class ArticleViewSet(viewsets.ModelViewSet):
    """
    Article ViewSet
    Read : Everyone
    Write/Delete : Require authenticated and author
    """
    queryset = Article.objects.select_related('author').all().order_by('-created_at')
    serializer_class = ArticleSerializer
    
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)