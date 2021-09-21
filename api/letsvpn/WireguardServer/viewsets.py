import ldap
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django_auth_ldap.backend import LDAPBackend

from api.logging import log
from api.models import User
from api.serializers import UserSerializer, UserPublicSerializer
from api.settings import AUTH_USER_MODEL, LDAP_SERVER_URI, LDAP_BIND_DN, LDAP_BIND_PASS, LDAP_USER_SEARCH_BASE, \
    LDAP_USER_SEARCH_FILTER, LDAP_ATTR_USERNAME, LDAP_ATTR_EMAIL, LDAP_ATTR_FIRST_NAME, LDAP_ATTR_LAST_NAME
from .serializers import WireguardServerSerializer, WireguardServerSerializerPublic
from .models import WireguardServer


class WireguardServerViewSet(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
    ):

    queryset = WireguardServer.objects.all()
    serializer_class = WireguardServerSerializer

    @action(methods=['GET'], detail=False)
    def test(self, request):
        l = ldap.initialize(LDAP_SERVER_URI)
        l.protocol_version = ldap.VERSION3
        l.simple_bind(LDAP_BIND_DN, LDAP_BIND_PASS)

        search_filter = LDAP_USER_SEARCH_FILTER

        attributes = [
            LDAP_ATTR_USERNAME,
            LDAP_ATTR_EMAIL,
            LDAP_ATTR_FIRST_NAME,
            LDAP_ATTR_LAST_NAME,
        ]

        backend = LDAPBackend()
        results = l.search_s(LDAP_USER_SEARCH_BASE, ldap.SCOPE_SUBTREE, search_filter, attributes)
        for query, u in results:
            username = u[LDAP_ATTR_USERNAME][0].decode('utf-8')
            user, created = backend.get_or_build_user(username, u)
            if created:
                user.save()
            user = backend.populate_user(username)
            log.debug(f'Prepopulate: {user}')

        return Response(results)

    def list(self, request):
        # TODO: Implement method
        return Response([])


