from .base import *
from decouple import config, Csv

# ==============================================================================
# SÉCURITÉ
# ==============================================================================

DEBUG = False
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', cast=Csv())

# Required in production: no localhost fallback in e-mail links
FRONTEND_URL = config('FRONTEND_URL')

# Render terminates HTTPS at its proxy and forwards plain HTTP to Gunicorn:
# trust its X-Forwarded-Proto header so Django knows the request was HTTPS
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# ==============================================================================
# COOKIES & HTTPS
# ==============================================================================

# Cookies only sent over HTTPS (admin session, CSRF, JWT)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SIMPLE_JWT['AUTH_COOKIE_SECURE'] = True

# HSTS: browsers must use HTTPS for this host for 1 year.
# No INCLUDE_SUBDOMAINS / PRELOAD: onrender.com is not our domain.
SECURE_HSTS_SECONDS = 31536000

SILENCED_SYSTEM_CHECKS = [
    # HTTP -> HTTPS redirect is already done by Render's proxy
    'security.W008',
    # HSTS INCLUDE_SUBDOMAINS / PRELOAD would apply to all of onrender.com
    'security.W005',
    'security.W021',
]

# ==============================================================================
# BASE DE DONNÉES
# ==============================================================================

DATABASES['default']['CONN_MAX_AGE'] = 600
DATABASES['default']['CONN_HEALTH_CHECKS'] = True

# ==============================================================================
# FICHIERS STATIQUES (WHITENOISE)
# ==============================================================================

STORAGES['staticfiles']['BACKEND'] = 'whitenoise.storage.CompressedManifestStaticFilesStorage'