from django.contrib import admin

from .models import UserSettings


# Define the inline instance used in the User admin field
class UserSettingsAdmin(admin.ModelAdmin):
    model = UserSettings
    can_delete = False


class UserSettingsInline(admin.StackedInline):
    model = UserSettings
    can_delete = False


# Register models in the admin interface.
admin.site.register(UserSettings, UserSettingsAdmin)

