import pytest
from datetime import timedelta
from django.utils import timezone
from users.models import PasswordResetCode

pytestmark = pytest.mark.django_db


@pytest.fixture
def reset_code(user):
    return PasswordResetCode.objects.create(user=user, code="123456")


def test_new_code_is_neither_expired_nor_locked(reset_code):
    assert not reset_code.is_expired
    assert not reset_code.is_locked


@pytest.mark.parametrize("age_in_minutes, expected_expired", [
    (14, False),
    (16, True),
])
def test_code_expires_after_15_minutes(reset_code, age_in_minutes, expected_expired):
    reset_code.created_at = timezone.now() - timedelta(minutes=age_in_minutes)

    assert reset_code.is_expired is expected_expired


def test_code_is_locked_after_max_attempts(reset_code):
    reset_code.attempts = PasswordResetCode.MAX_ATTEMPTS - 1
    assert not reset_code.is_locked

    reset_code.attempts = PasswordResetCode.MAX_ATTEMPTS
    assert reset_code.is_locked
