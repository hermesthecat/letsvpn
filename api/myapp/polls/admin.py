from django.contrib import admin

from .models import PollQuestion
from .models import PollAnswer


# Define an inline version of the class to view from its parent relation.
class PollAnswerInline(admin.TabularInline):
    model = PollAnswer
    fields = ['content', 'owner']


# Define the admin for the parent model
class PollQuestionAdmin(admin.ModelAdmin):
    inlines = (PollAnswerInline,)


# Register models in the admin interface.
admin.site.register(PollQuestion, PollQuestionAdmin)
admin.site.register(PollAnswer)

