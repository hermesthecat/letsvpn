import asyncio
import json
import re
import traceback
import urllib

import django
import requests
from django.shortcuts import get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseForbidden, HttpResponseNotFound, HttpResponseRedirect
from api.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_user
from django.contrib.auth import logout as logout_user
from django.views.decorators.cache import never_cache
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView


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


@csrf_exempt
@require_http_methods(['POST'])
def register(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        username = data['username']
        email = data['email']
        password = data['password']

        user = User.objects.create_user(username, email, password)
        user.save()

        if user.is_authenticated:
            return HttpResponse(json.dumps(True))
        else:
            return HttpResponse(json.dumps(False))

    return False



from django.conf import settings

from rest_framework import serializers
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from requests.exceptions import HTTPError

from social_django.utils import psa


# TODO: find out if SocialSerializer is necessary, or how to use it properly to make an api call during initlization

class SocialSerializer(serializers.Serializer):
    """
    Serializer which accepts an OAuth2 access token.
    """
    access_token = serializers.CharField(
        allow_blank=False,
        trim_whitespace=True,
    )


@api_view(http_method_names=['POST'])
@permission_classes([AllowAny])
@psa()
def exchange_token(request, backend):
    """
    Exchange an OAuth2 access token for one for this site.

    This simply defers the entire OAuth2 process to the front end.
    The front end becomes responsible for handling the entirety of the
    OAuth2 process; we just step in at the end and use the access token
    to populate some user identity.

    The URL at which this view lives must include a backend field, like:
        url(API_ROOT + r'social/(?P<backend>[^/]+)/$', exchange_token),

    Using that example, you could call this endpoint using i.e.
        POST API_ROOT + 'social/facebook/'
        POST API_ROOT + 'social/google-oauth2/'

    Note that those endpoint examples are verbatim according to the
    PSA backends which we configured in settings.py. If you wish to enable
    other social authentication backends, they'll get their own endpoints
    automatically according to PSA.

    ## Request format

    Requests must include the following field
    - `access_token`: The OAuth2 access token provided by the provider
    """
    serializer = SocialSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        # set up non-field errors key
        # http://www.django-rest-framework.org/api-guide/exceptions/#exception-handling-in-rest-framework-views
        try:
            nfe = settings.NON_FIELD_ERRORS_KEY
        except AttributeError:
            nfe = 'non_field_errors'

        try:
            # this line, plus the psa decorator above, are all that's necessary to
            # get and populate a user object for any properly enabled/configured backend
            # which python-social-auth can handle.
            user = request.backend.do_auth(serializer.validated_data['access_token'])
        except HTTPError as e:
            # An HTTPError bubbled up from the request to the social auth provider.
            # This happens, at least in Google's case, every time you send a malformed
            # or incorrect access key.
            return Response(
                {'errors': {
                    'token': 'Invalid token',
                    'detail': str(e),
                }},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user:
            existing_user = User.objects.filter(username=user.discord_profile.discord_username).first()
            # Replace new user with existing user, and update existing users email.
            if existing_user and user.discord_profile.discord_username == existing_user.username:
                existing_user.email = user.email
                user.delete()
                user = existing_user
                user.save()

            if user.is_active:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
            else:
                # user is not active; at some point they deleted their account,
                # or were banned by a superuser. They can't just log in with their
                # normal credentials anymore, so they can't log in with social
                # credentials either.
                return Response(
                    {'errors': {nfe: 'This user account is inactive'}},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            # Unfortunately, PSA swallows any information the backend provider
            # generated as to why specifically the authentication failed;
            # this makes it tough to debug except by examining the server logs.
            return Response(
                {'errors': {nfe: "Authentication Failed"}},
                status=status.HTTP_400_BAD_REQUEST,
            )

