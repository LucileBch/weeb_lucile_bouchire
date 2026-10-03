import pytest
from django.urls import reverse
from rest_framework import status
from articles.models import Article

pytestmark = pytest.mark.django_db


def test_anonymous_can_read_but_not_create(api_client, article):
    url = reverse("article-list")

    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data["count"] == 1

    response = api_client.post(url, {"title": "Article anonyme"}, format="json")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert Article.objects.count() == 1


def test_author_is_set_by_the_server(authenticated_client, user, other_user):
    # Trying to publish on behalf of another user: the author field is ignored
    data = {"title": "Mon article", "content": "Contenu", "author": other_user.id}

    response = authenticated_client.post(reverse("article-list"), data, format="json")

    assert response.status_code == status.HTTP_201_CREATED
    assert Article.objects.get().author == user
    assert response.data["author"]["id"] == user.id


@pytest.mark.parametrize("method", ["put", "patch", "delete"])
def test_user_cannot_modify_another_users_article(api_client, other_user, article, method):
    api_client.force_authenticate(user=other_user)
    url = reverse("article-detail", args=[article.id])

    response = getattr(api_client, method)(url, {"title": "Titre modifié"}, format="json")

    assert response.status_code == status.HTTP_403_FORBIDDEN
    article.refresh_from_db()
    assert article.title == "Premier article"
