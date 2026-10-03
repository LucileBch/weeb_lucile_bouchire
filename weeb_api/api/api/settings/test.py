from .base import *
from decouple import config

# ==============================================================================
# BASE DE DONNÉES
# ==============================================================================

# Local PostgreSQL (Docker container locally, service container in CI):
# same engine as production, never the Supabase databases.
# Dedicated TEST_DB_* variables so DB_* from .env can't be used by mistake.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('TEST_DB_NAME', default='postgres'),
        'USER': config('TEST_DB_USER', default='postgres'),
        'PASSWORD': config('TEST_DB_PASSWORD', default='postgres'),
        'HOST': config('TEST_DB_HOST', default='localhost'),
        'PORT': config('TEST_DB_PORT', default='5433'),
    }
}

# ==============================================================================
# SERVICES EXTERNES
# ==============================================================================

# Uploaded files kept in memory: no real upload to Cloudinary
STORAGES['default'] = {'BACKEND': 'django.core.files.storage.InMemoryStorage'}

# E-mails captured in memory (django.core.mail.outbox): nothing is sent
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

# ==============================================================================
# PERFORMANCE
# ==============================================================================

# Fast (insecure) hasher: tests only, makes user creation much faster
PASSWORD_HASHERS = ['django.contrib.auth.hashers.MD5PasswordHasher']
