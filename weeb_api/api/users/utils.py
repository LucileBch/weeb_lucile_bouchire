import secrets
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

def generate_reset_code():
    """
    Creates cryptographically secure random code with 6 number
    """
    return f"{secrets.randbelow(10**6):06d}"

def revoke_all_user_sessions(user):
    """
    Blacklist every refresh token of the user
    to disconnect all devices (used after a password change)
    """
    tokens = OutstandingToken.objects.filter(user=user, blacklistedtoken__isnull=True)
    BlacklistedToken.objects.bulk_create(
        [BlacklistedToken(token=token) for token in tokens],
        ignore_conflicts=True
    )
