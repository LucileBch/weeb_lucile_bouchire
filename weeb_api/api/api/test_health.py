import pytest
from unittest import mock
from django.db.utils import OperationalError
from django.urls import reverse
from rest_framework import status

pytestmark = pytest.mark.django_db


def test_health_check_ok(api_client):
    response = api_client.get(reverse("health_check"))

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"status": "ok", "database": "ok"}


def test_health_check_reports_unreachable_database(api_client):
    # Simulate a database outage
    with mock.patch("api.views.connection.cursor", side_effect=OperationalError):
        response = api_client.get(reverse("health_check"))

    assert response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE
    assert response.json()["database"] == "unreachable"


def test_api_root_points_to_useful_routes(api_client, settings):
    settings.FRONTEND_URL = "https://lb-weeb.vercel.app"

    response = api_client.get(reverse("api_root"))

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "name": "Weeb API",
        "status": "ok",
        "frontend": "https://lb-weeb.vercel.app",
        "health": "/health/",
        "articles": "/api/articles/",
    }
