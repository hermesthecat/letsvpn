
from .. import env
from . import AUTHENTICATION_BACKENDS


AUTH_PAM_ENABLED = env.bool('AUTH_PAM_ENABLED', False)
AUTH_PAM_SUPERUSER_GROUP = env.int('AUTH_PAM_SUPERUSER_GROUP', None)
AUTH_PAM_STAFF_GROUP = env.int('AUTH_PAM_STAFF_GROUP', None)


if AUTH_PAM_ENABLED:
    #AUTHENTICATION_BACKENDS.append('django_pam.auth.backends.PAMBackend')
    AUTHENTICATION_BACKENDS.append('api.backends.PAMBackend')
