################################################################################
# Database Settings
################################################################################


from . import env


DB_TYPE = 'django.db.backends.postgresql'
DB_HOST = env.str('DB_HOST', 'boilerplate')
DB_PORT = env.int('DB_PORT', 5432)
DB_NAME = env.str('DB_NAME', 'boilerplate')
DB_USER = env.str('DB_USER', 'boilerplate')
DB_PASS = env.str('DB_PASS', 'boilerplate')

DATABASES = {
    'default': {
        'ENGINE': DB_TYPE,
        'NAME': DB_NAME,
        'USER': DB_USER,
        'PASSWORD': DB_PASS,
        'HOST': DB_HOST,
        'PORT': DB_PORT
    }
}