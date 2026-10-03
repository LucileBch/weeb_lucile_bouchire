import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from articles.models import Article

User = get_user_model()

# Meets every password rule (length, upper, lower, digit, special character)
PASSWORD = "Weeb-Test-2026!"


@pytest.fixture
def password():
    return PASSWORD


@pytest.fixture
def user(db, password):
    """Active account (validated by the administrator)"""
    return User.objects.create_user(
        email="alice@example.com",
        password=password,
        first_name="Alice",
        last_name="Martin",
        is_active=True,
    )


@pytest.fixture
def other_user(db, password):
    """Second active account, to check data isolation between users"""
    return User.objects.create_user(
        email="bob@example.com",
        password=password,
        first_name="Bob",
        last_name="Durand",
        is_active=True,
    )


@pytest.fixture
def inactive_user(db, password):
    """Account still waiting for the administrator's validation (default state)"""
    return User.objects.create_user(
        email="claire@example.com",
        password=password,
        first_name="Claire",
        last_name="Petit",
    )


@pytest.fixture
def api_client():
    """Anonymous API client"""
    return APIClient()


@pytest.fixture
def authenticated_client(api_client, user):
    """API client logged in as `user` (bypasses the cookie login flow)"""
    api_client.force_authenticate(user=user)
    return api_client


@pytest.fixture
def article(user):
    """Article written by `user`"""
    return Article.objects.create(title="Premier article", content="Contenu", author=user)
