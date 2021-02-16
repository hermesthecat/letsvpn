################################################################################
# Django Settings
################################################################################
import os

from . import env
from .auth.pam import AUTH_PAM_ENABLED

# Required Django Settings
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = 'f^+5d67i58dty7gx8_2#8e4dw^1k8f&8y_gg&8tb_z4n5%cse0'
WSGI_APPLICATION = 'api.wsgi.application'
ASGI_APPLICATION = "api.asgi.application"
DEBUG = env.bool('DEBUG', False)

# Django Apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_better_admin_arrayfield',
    'rest_framework',
    'rest_framework.authtoken',
    'social_django',
    # Register API as an app for registering multiple app profiles under one User model. Only uses apps.py and admin.py
    'api',
    # Register other apps here
    'myapp',
    'colorfield',
]
if AUTH_PAM_ENABLED:
    INSTALLED_APPS.insert(8, 'django_pam')


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

