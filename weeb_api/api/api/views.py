from django.db import connection  # Django connection to the configured database
from django.db.utils import DatabaseError  # parent class of every database error
from django.http import JsonResponse  # HTTP response with a JSON body


def health_check(request):
    """
    Health check for uptime monitoring
    The API responds and the database is reachable: 200
    Database unreachable: 503
    """
    try:
        # Opens a cursor (connects if needed), closed automatically after the block
        with connection.cursor() as cursor:
            # Lightest possible query: reads no table, only proves the database answers
            cursor.execute("SELECT 1")
    # Database unreachable
    except DatabaseError:
        # 503 Service Unavailable: the API runs but a dependency is down
        return JsonResponse({"status": "error", "database": "unreachable"}, status=503)

    # No error: 200 OK, the API and the database are both up
    return JsonResponse({"status": "ok", "database": "ok"})


def trigger_error(request):
    """
    Temporary view to check that errors reach Sentry
    """
    # Unhandled ZeroDivisionError -> 500 response, reported to Sentry
    division_by_zero = 1 / 0
    return JsonResponse({"this": "will never be returned"})
