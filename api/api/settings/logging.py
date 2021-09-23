################################################################################
# Logging Settings
################################################################################


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'hide_staticfiles': {
            '()': 'api.logging.SkipStaticFilter'
        }
    },
    'formatters': {
        'simple': {
            'class': 'coloredlogs.ColoredFormatter',
            'format': '[DJANGO][%(levelname)8s] %(message)s',
            'style': '%',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
            'filters': ['hide_staticfiles'],
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'propagate': True,
            'level': 'INFO',
        },
        "django_auth_ldap": {"level": "DEBUG", "handlers": ["console"]}
    },
}