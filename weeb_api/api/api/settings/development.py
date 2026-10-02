from .base import *

# SECURITY WARNING: don't run with debug turned on in production
DEBUG = True

# With DEBUG=True, an empty list allows localhost / 127.0.0.1 / [::1]
ALLOWED_HOSTS = []

# Vite dev server
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
]