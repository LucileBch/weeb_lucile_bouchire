import random
import string

def generate_reset_code():
    """
    Creates random code with 6 number
    """
    return ''.join(random.choices(string.digits, k=6))