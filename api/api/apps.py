import ldap
from django.apps import AppConfig

from api.logging import log
from api.settings import AUTH_LDAP_ENABLED


class APIConfig(AppConfig):
    name = 'api'

    def ready(self):
        # TODO: Make auto populate work properly
        from django_auth_ldap.backend import LDAPBackend
        if AUTH_LDAP_ENABLED:
            # Imports have to be local because they are not exported when LDAP is not enabled.
            from api.settings import LDAP_AUTOPOPULATE, LDAP_SERVER_URI, LDAP_BIND_DN, LDAP_BIND_PASS, \
                LDAP_USER_SEARCH_FILTER, \
                LDAP_ATTR_USERNAME, LDAP_ATTR_EMAIL, LDAP_ATTR_FIRST_NAME, LDAP_ATTR_LAST_NAME, LDAP_USER_SEARCH_BASE

            if LDAP_AUTOPOPULATE:
                log.info('Pre-populating users from LDAP...')
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
                    log.debug(f'Pre-populate: {user}')
                log.info('Finished pre-populating users.')
