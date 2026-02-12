from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Article

User = get_user_model()

class AuthorSerializer(serializers.ModelSerializer):
    """
    Author Serializer for Article
    """
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']

class ArticleSerializer(serializers.ModelSerializer):
    """
    Article Serializer
    """
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'image', 'created_at', 'updated_at', 'author']