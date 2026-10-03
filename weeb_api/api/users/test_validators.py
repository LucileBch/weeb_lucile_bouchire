import pytest
from django.core.exceptions import ValidationError
from users.validators import PasswordComplexityValidator

validator = PasswordComplexityValidator(max_length=20)


def test_valid_password_is_accepted():
    # Raises ValidationError if a rule is not met
    validator.validate("Weeb-Test-2026!")


@pytest.mark.parametrize("password, expected_error", [
    ("weeb-test-2026!", "majuscule"),
    ("WEEB-TEST-2026!", "minuscule"),
    ("Weeb-Test-Pass!", "chiffre"),
    ("WeebTest2026", "caractère spécial"),
    ("Weeb Test-2026!", "espaces"),
    ("Weeb-Test-2026!-Too-Long", "dépasser 20"),
])
def test_invalid_password_is_rejected(password, expected_error):
    with pytest.raises(ValidationError) as error:
        validator.validate(password)

    assert any(expected_error in message for message in error.value.messages)
