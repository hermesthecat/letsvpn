from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from api.models import User

from letsvpn.UserSettings.admin import UserSettingsInline


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    # Add profiles for other apps here
    inlines = (
        UserSettingsInline,
    )


#admin.site.unregister(User)
admin.site.register(User, UserAdmin)
