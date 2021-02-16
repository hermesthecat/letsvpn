from django.contrib import admin

from .models import MyAppProfile


# Define the inline instance used in the User admin field
class MyAppProfileInline(admin.StackedInline):
    model = MyAppProfile
    can_delete = False
    verbose_name_plural = 'MyApp Profiles'


# Register models in the admin interface.
admin.site.register(MyAppProfile)

