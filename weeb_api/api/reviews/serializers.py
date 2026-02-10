from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    """
    Review serializer
    """
    class Meta:
        model = Review
        fields = ['id', 'first_name', 'last_name', 'email', 'subjetc', 'message', 'author', 'is_processed', 'created_at']
        read_only_fields = ['author', 'is_processed', 'created_at']