from django.contrib import admin

from .models import GlobalSettings


# Define the inline instance used in the User admin field
class GlobalSettingsAdmin(admin.ModelAdmin):
    model = GlobalSettings
    can_delete = False


# Register models in the admin interface.
admin.site.register(GlobalSettings, GlobalSettingsAdmin)

