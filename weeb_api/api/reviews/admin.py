from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('subject', 'full_name', 'email', 'is_member', 'is_processed', 'created_at')
    list_filter = ('is_processed', 'author', 'created_at')
    search_fields = ('subject',)
    list_editable = ('is_processed',)
    readonly_fields = ('created_at',)
    
    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    
    def is_member(self, obj):
        return obj.author is not None
    is_member.boolean = True
    is_member.short_description = "membre"