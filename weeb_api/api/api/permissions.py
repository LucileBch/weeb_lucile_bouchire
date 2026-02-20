from rest_framework import viewsets, permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Permission IsAuthorOrReadOnly
    Only authors can update or delete their own articles
    """
    def has_object_permission(self, request, view, obj):
        # Read methods allowed for everyone
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write/Delete allowed only if authenticated and author
        return obj.author == request.user