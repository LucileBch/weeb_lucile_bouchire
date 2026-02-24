from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import RegisterViewSet, MyTokenObtainPairView, LogoutView, MyTokenRefreshView, PasswordResetRequestView, PasswordResetConfirmView

router = DefaultRouter()

router.register(r'signup', RegisterViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),

    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh-token/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('password-reset-request/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]