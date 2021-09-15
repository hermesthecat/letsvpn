from django.contrib import admin

from .models import UserSettings


# Define the inline instance used in the User admin field
class UserSettingsInline(admin.StackedInline):
    model = UserSettings
    can_delete = False
    verbose_name_plural = 'User Settings'


# Register models in the admin interface.
admin.site.register(UserSettings)

