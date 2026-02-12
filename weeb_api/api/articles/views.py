from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .models import Article
from .serializers import ArticleSerializer

# todo: write, update, delete with authentication after
class ArticleViewSet(viewsets.ModelViewSet):
    """
    Article ViewSet
    Read : Everyone
    Write : Require authentication
    """
    queryset = Article.objects.select_related('author').all().order_by('-created_at')
    serializer_class = ArticleSerializer
    
    permission_classes = [IsAuthenticatedOrReadOnly]