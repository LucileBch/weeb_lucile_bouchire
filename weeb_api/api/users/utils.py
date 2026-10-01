import secrets

def generate_reset_code():
    """
    Creates cryptographically secure random code with 6 number
    """
    return f"{secrets.randbelow(10**6):06d}"
