################################################################################
# Authentication Settings
################################################################################
from datetime import timedelta


AUTH_USER_MODEL = 'api.User'

AUTHENTICATION_BACKENDS = [
    'api.auth.TokenBackend',
    'django.contrib.auth.backends.ModelBackend',
]

SIMPLE_JWT = {
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    #'ACCESS_TOKEN_LIFETIME': timedelta(seconds=15),
    'ROTATE_REFRESH_TOKENS': True,
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]


################################################################################
# LDAP Settings
################################################################################
import ldap
from django_auth_ldap.config import LDAPSearch, GroupOfNamesType, LDAPGroupQuery
from environs import EnvValidationError

from .. import env, DEBUG
from . import AUTHENTICATION_BACKENDS


LDAP_SERVER_URI = env.str('LDAP_SERVER_URI', None)
AUTH_LDAP_ENABLED = True if LDAP_SERVER_URI else False
LDAP_AUTOPOPULATE = env.bool('LDAP_AUTOPOPULATE', not DEBUG)

if AUTH_LDAP_ENABLED:
    if not LDAP_SERVER_URI.startswith('ldap://'):
        if not LDAP_SERVER_URI.startswith('ldaps://'):
            raise ValueError('Not a valid LDAP URI.')

    # Environment variables
    LDAP_BIND_DN = env.str('LDAP_BIND_DN', None)
    LDAP_BIND_PASS = env.str('LDAP_BIND_PASS', None)

    LDAP_USER_SEARCH_BASE = env.str('LDAP_USER_SEARCH_BASE', None)
    #LDAP_USER_SEARCH_FILTER = env.str('LDAP_USER_SEARCH_FILTER', '(uid=%(user)s)')
    LDAP_USER_SEARCH_FILTER = env.str('LDAP_USER_SEARCH_FILTER', '(uid=%(user)s)')

    LDAP_GROUP_SEARCH_BASE = env.str('LDAP_GROUP_SEARCH_BASE', None)
    LDAP_GROUP_SEARCH_FILTER = env.str('LDAP_GROUP_SEARCH_FILTER', '(objectClass=groupOfNames)')

    LDAP_ATTR_USERNAME = env.str('LDAP_ATTR_USERNAME', 'uid')
    LDAP_ATTR_FIRST_NAME = env.str('LDAP_ATTR_FIRST_NAME', 'givenName')
    LDAP_ATTR_LAST_NAME = env.str('LDAP_ATTR_LAST_NAME', 'sn')
    LDAP_ATTR_EMAIL = env.str('LDAP_ATTR_EMAIL', 'mail')

    LDAP_STAFF_GROUP = env.str('LDAP_STAFF_GROUP', None)
    LDAP_SUPERUSER_GROUP = env.str('LDAP_SUPERUSER_GROUP', None)

    # Django required variables
    AUTHENTICATION_BACKENDS.insert(0, 'django_auth_ldap.backend.LDAPBackend')
    AUTH_LDAP_SERVER_URI = LDAP_SERVER_URI
    AUTH_LDAP_BIND_DN = LDAP_BIND_DN
    AUTH_LDAP_BIND_PASSWORD = LDAP_BIND_PASS
    AUTH_LDAP_USER_SEARCH = LDAPSearch(
        LDAP_USER_SEARCH_BASE, ldap.SCOPE_SUBTREE, LDAP_USER_SEARCH_FILTER
    )
    AUTH_LDAP_GROUP_SEARCH = LDAPSearch(
        LDAP_GROUP_SEARCH_BASE, ldap.SCOPE_SUBTREE, LDAP_GROUP_SEARCH_FILTER
    )
    AUTH_LDAP_GROUP_TYPE = GroupOfNamesType()
    AUTH_LDAP_USER_ATTR_MAP = {
        'first_name': LDAP_ATTR_FIRST_NAME,
        'last_name': LDAP_ATTR_LAST_NAME,
        'email': LDAP_ATTR_EMAIL,
    }

    AUTH_LDAP_USER_FLAGS_BY_GROUP = {
        # "is_active": "cn=active,ou=groups,dc=example,dc=com",
        "is_staff": LDAP_STAFF_GROUP,
        "is_superuser": LDAP_SUPERUSER_GROUP,
    }



# Cast to tuple as required.
# It's initialized as a list originally so you can append it depending on which authentication methods you use.
AUTHENTICATION_BACKENDS = tuple(AUTHENTICATION_BACKENDS)
