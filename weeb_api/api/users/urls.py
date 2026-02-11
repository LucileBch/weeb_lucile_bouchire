from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import RegisterViewSet

router = DefaultRouter()

router.register(r'auth/signup', RegisterViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls))
]