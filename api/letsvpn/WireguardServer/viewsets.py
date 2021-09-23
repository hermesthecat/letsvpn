import ldap
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from api.logging import log
from api.models import User
from api.serializers import UserSerializer, UserPublicSerializer
from api.settings.auth import *
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

    @action(methods=['GET'], detail=False, permission_classes=[AllowAny])
    def test(self, request):
        from django_auth_ldap.backend import LDAPBackend
        backend = LDAPBackend()
        l = ldap.initialize(LDAP_SERVER_URI)
        l.protocol_version = ldap.VERSION3
        l.simple_bind(LDAP_BIND_DN, LDAP_BIND_PASS)

        from django_auth_ldap.backend import LDAPBackend
        log.info('Pre-populating users from LDAP...')
        from django_auth_ldap.config import LDAPSearch
        r = LDAPSearch(LDAP_USER_SEARCH_BASE, ldap.SCOPE_SUBTREE, LDAP_USER_SEARCH_FILTER)
        log.debug(r)
        result = r.execute(l)

        user, created = backend.get_or_build_user('cclloyd', result[0])
        #if user:
        user = backend.populate_user('cclloyd')
        log.debug(user)

        return Response(result)


        search_filter = LDAP_USER_SEARCH_FILTER

        attributes = [
            '*'
            #LDAP_ATTR_USERNAME,
            #LDAP_ATTR_EMAIL,
            #'memberOf',
            #LDAP_ATTR_FIRST_NAME,
            #LDAP_ATTR_LAST_NAME,
        ]

        results = l.search_s(LDAP_USER_SEARCH_BASE, ldap.SCOPE_SUBTREE, search_filter, attributes)
        return Response(results)
        for query, u in results:
            username = u[LDAP_ATTR_USERNAME][0].decode('utf-8')
            user, created = backend.get_or_build_user(username, u)
            if created:
                user.save()
            log.debug(user)
            log.debug(user.username)
            log.debug(user.email)
            backend.populate_user(username)
            log.debug(f'Pre-populate: {user}, {user.email} END')
            return Response(results)
        log.info('Finished pre-populating users.')

        return Response(results)

    def list(self, request):
        # TODO: Implement method
        return Response([])


