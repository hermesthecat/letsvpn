################################################################################
# Authentication Settings
################################################################################
from datetime import timedelta


AUTH_USER_MODEL = 'api.User'

AUTHENTICATION_BACKENDS = [
    'social_core.backends.discord.DiscordOAuth2',
    'api.auth.TokenBackend',
    'django.contrib.auth.backends.ModelBackend',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

SIMPLE_JWT = {
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    #'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'ACCESS_TOKEN_LIFETIME': timedelta(seconds=15),
    'ROTATE_REFRESH_TOKENS': True,
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]


# Import other authentication modules
from .ldap import *
from .pam import *


# Cast to tuple as required.
# It's initialized as a list originally so you can append it depending on which authentication methods you use.
AUTHENTICATION_BACKENDS = tuple(AUTHENTICATION_BACKENDS)
