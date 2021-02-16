from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from api.models import User

from myapp.MyAppProfile.admin import MyAppProfileInline


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    # Add profiles for other apps here
    inlines = (
        MyAppProfileInline,
    )


#admin.site.unregister(User)
admin.site.register(User, UserAdmin)
