# Official Python image, same version as local venv and Render
FROM python:3.13.7-slim

# No .pyc files; logs printed immediately (visible in Render logs)
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Dependencies first: this layer stays cached until requirements.txt changes
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Django project (folder containing manage.py)
COPY api/ .

# Run as a non-root user
RUN useradd --create-home appuser && chown -R appuser /app
USER appuser

EXPOSE 8000

# Startup: apply migrations, collect static files, then serve with Gunicorn
# on the port given by the platform (Render sets $PORT, 8000 by default).
# "exec" makes Gunicorn the main process so it receives stop signals.
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && exec gunicorn api.wsgi:application --bind 0.0.0.0:${PORT:-8000}"]
