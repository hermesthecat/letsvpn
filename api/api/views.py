import json
import re

from django.http import HttpResponse, HttpResponseForbidden, HttpResponseNotFound, HttpResponseRedirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_user
from django.views.decorators.cache import never_cache
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView

from api.models import User

index = never_cache(TemplateView.as_view(template_name='api/index.html'))
favicon = never_cache(TemplateView.as_view(template_name='api/favicon.ico'))


# TODO: Change to viewset???

def handler404(request, *args, **kwargs):
    return HttpResponseRedirect('/')


@require_http_methods(['POST'])
def login(request):

    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        username = data['username']
        password = data['password']
        if username is None:
            return HttpResponseForbidden('Username is blank')

        if re.compile('.+@.+\..+').match(username):
            user = authenticate(email=username, password=password)
        else:
            user = authenticate(username=username, password=password)

        if user is not None:
            auth_user(request, user)
            return HttpResponse(json.dumps(True), content_type="application/json")
        else:
            response = {
                'success': False,
                'error': True,
                'message': "The username/email or password was incorrect.\nUser:%s\nPass:%s" % (username, password),
            }
            return HttpResponseForbidden(json.dumps(response))

    else:
        return HttpResponseNotFound("Post method required.")
