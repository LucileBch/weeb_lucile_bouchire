import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from articles.models import Article

pytestmark = pytest.mark.django_db


def login(client, email, password):
    return client.post(
        reverse("token_obtain_pair"),
        {"email": email, "password": password},
        format="json",
    )


def test_inactive_account_cannot_log_in(api_client, inactive_user, password):
    response = login(api_client, inactive_user.email, password)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "access_token" not in response.cookies


def test_login_sets_httponly_cookies_used_to_authenticate(api_client, user, password):
    response = login(api_client, user.email, password)

    assert response.status_code == status.HTTP_200_OK
    for name in ("access_token", "refresh_token"):
        assert response.cookies[name].value
        assert response.cookies[name]["httponly"]
    # Tokens are only in the cookies, never readable by the page's JavaScript
    assert "access" not in response.data
    assert "refresh" not in response.data
    assert response.data["user_data"]["email"] == user.email

    # The client sends the cookies back: no other authentication is needed
    response = api_client.post(
        reverse("article-list"), {"title": "Publié grâce au cookie"}, format="json"
    )
    assert response.status_code == status.HTTP_201_CREATED
    assert Article.objects.get().author == user


def test_logout_clears_cookies_and_revokes_refresh_token(api_client, user, password):
    login(api_client, user.email, password)
    refresh_token = api_client.cookies["refresh_token"].value

    response = api_client.post(reverse("logout"))

    assert response.status_code == status.HTTP_200_OK
    assert response.cookies["access_token"].value == ""
    assert response.cookies["refresh_token"].value == ""
    assert BlacklistedToken.objects.filter(token__user=user).count() == 1

    # The old refresh token can no longer create a new session
    api_client.cookies["refresh_token"] = refresh_token
    response = api_client.post(reverse("token_refresh"))
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
