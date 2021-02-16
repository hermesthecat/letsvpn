from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_sso import claims


def authenticate_payload(payload):
    user_model = get_user_model()
    user, created = user_model.objects.get_or_create(
        service=payload.get(claims.ISSUER),
        external_id=payload.get(claims.USER_ID),
    )
    if not user.is_active:
        raise AuthenticationFailed('User inactive or deleted.')
    return user
