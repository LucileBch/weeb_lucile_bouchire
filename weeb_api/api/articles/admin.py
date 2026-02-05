from django.contrib import admin
from .models import Article
from django.utils.html import format_html

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'author', 'image_preview', 'image', 'created_at', 'updated_at')
    list_filter = ('author', 'created_at')
    search_fields = ('title', 'author')
    readonly_fields = ('created_at', 'updated_at')

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 50px; height:auto; border-radius: 5px;" />', obj.image.url)
        return "Pas d'image"
    
    image_preview.short_description = 'Aperçu'