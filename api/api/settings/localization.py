################################################################################
# Internationalization Settings
################################################################################


from . import env


LANGUAGE_CODE = 'en-us'
TIME_ZONE = env.str('TZ', 'America/New_York')
USE_I18N = True
#USE_L10N = True
USE_TZ = True