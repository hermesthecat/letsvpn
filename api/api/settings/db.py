################################################################################
# Database Settings
################################################################################


from . import env


DB_TYPE = env.str('DB_TYPE', 'sqlite3')
DB_HOST = env.str('DB_HOST', 'letsvpn')
DB_PORT = env.int('DB_PORT', 5432)
DB_NAME = env.str('DB_NAME', '/data/db.sqlite3')
DB_USER = env.str('DB_USER', 'letsvpn')
DB_PASS = env.str('DB_PASS', 'letsvpn')

if DB_HOST:
    DATABASES = {
        'default': {
            'ENGINE': f'django.db.backends.{DB_TYPE}',
            'USER': DB_USER,
            'PASSWORD': DB_PASS,
            'HOST': DB_HOST,
            'PORT': DB_PORT
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': DB_TYPE,
            'NAME': DB_NAME,
        }
    }
