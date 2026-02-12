from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('reviews.urls')),
    path('api/', include('users.urls')),
    path('api/', include('articles.urls')),
]

# if dev mode, bridge for articles' images
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)