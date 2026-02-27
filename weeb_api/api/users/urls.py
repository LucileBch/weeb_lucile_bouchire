from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import RegisterViewSet, MyTokenObtainPairView, LogoutView, MyTokenRefreshView, ForgotPasswordCodeRequestView, ForgotPasswordConfirmView, UserProfileUpdateView

# router = DefaultRouter()

# router.register(r'signup', RegisterViewSet, basename='register')

urlpatterns = [
    # path('', include(router.urls)),
    path('signup/', RegisterViewSet.as_view({'post': 'create'}), name='register'),

    path('auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh-token/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),

    path('users/forgot-password-code-request/', ForgotPasswordCodeRequestView.as_view(), name='forgot-password-code-request'),
    path('users/forgot-password-confirm/', ForgotPasswordConfirmView.as_view(), name='forgot-password-confirm'),
    
    path('users/me/', UserProfileUpdateView.as_view(), name='user-profile-update'),
]