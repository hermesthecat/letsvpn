################################################################################
# Django Settings
################################################################################
import os

from . import env

# Required Django Settings
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = 'f^+5d67i58dty7gx8_2#8e4dw^1k8f&8y_gg&8tb_z4n5%cse0'
WSGI_APPLICATION = 'api.wsgi.application'
ASGI_APPLICATION = "api.asgi.application"
APIDEBUG = env.bool('APIDEBUG', False)
DEBUG = env.bool('DEBUG', False)
if APIDEBUG:
    DEBUG = True

# Django Apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'drf_spectacular',
    'drf_yasg',
    # Register API as an app for registering multiple app profiles under one User model. Only uses apps.py and admin.py
    'api',
    # Register other apps here
    'letsvpn',
    'colorfield',
]

# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Static Files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/staticfiles/'

# URL Config
ROOT_URLCONF = 'api.urls'
LOGIN_REDIRECT_URL = '/api/'

# Media Settings
MEDIA_ROOT = env.path('MEDIA_ROOT', '/data/')
MEDIA_HOSTNAME = env.str('MEDIA_HOSTNAME', '')
MEDIA_URL = f'{MEDIA_HOSTNAME}/media/'
CONTENT_TYPES = ['image']
MAX_UPLOAD_SIZE = 41943040

DEFAULT_PERMISSION_CLASS = env.str('DEFAULT_PERMISSION_CLASS', 'rest_framework.permissions.IsAuthenticated')
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        DEFAULT_PERMISSION_CLASS,
    ],
    #'DEFAULT_RENDERER_CLASSES': (
    #    'rest_framework.renderers.BrowsableAPIRenderer',
    #    'rest_framework.renderers.JSONRenderer',
    #    'rest_framework.renderers.CoreJSONRenderer',
        #'rest_framework_swagger.renderers.SwaggerUIRenderer',
        #'rest_framework_swagger.renderers.OpenAPIRenderer',
    #),
    #'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'LetsVPN API',
    'DESCRIPTION': 'LetsVPN API Full Schema',
    'VERSION': '0.1.0',
    # OTHER SETTINGS
}


WG_COMMAND = env.list('WG_COMMAND', list('wg'))
WGQ_COMMAND = env.list('WGQ_COMMAND', list('wg-quick'))
PI_PASSWORD = env.str('PI_PASSWORD', None)
PI_IP = env.str('PI_IP', '127.0.0.1')



