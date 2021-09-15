from django.contrib import admin

from .models import GlobalSettings


# Define the inline instance used in the User admin field
class UserSettingsInline(admin.StackedInline):
    model = GlobalSettings
    can_delete = False
    verbose_name_plural = 'LetsVPN Settings'


# Register models in the admin interface.
admin.site.register(GlobalSettings)

