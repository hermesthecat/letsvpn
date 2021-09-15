# Django React Boilerplate

This project will serve as a letsvpn for my projects for faster prototyping.  It implements an API using Django and Django Rest Framework to provide the backend, complete with authentication, LDAP support, and async ready.  It also implements a frontend using React, Redux-toolkit, and Material-UI.

Versions not up to date yet.


Features:

- Fully functional API included.  Built on:
  - Django
  - Django Rest Framework w/ JWT
  - Django Social Auth (allows to sign in with google, discord, etc)
  - Unvicorn (async ready server)
- Fully functional base UI included.  Built on:
  - React
  - Redux w/ Redux Toolkit
  - Material-UI
    
## API Features:
- Users with profiles built in using Django
  - Custom user model applied by default to easily extend the default User model
- Custom Django abstract model included to make IDs use random characters instead of incrementing integers, for security best practices
  - Other models you create should inherit from `api.models.UUIDModel` instead of Django's model class.
- Supports multiple authentication types (creates Django user when authenticated using one of these methods)
  - Built in django users
  - LDAP authentication
  - Social auth
  - Linux PAM authentication (basic)
- REST API included
- Example django app included (MyApp/Polls)

## UI Features:
- React frontend included with authentication built in using JWT and the Django API
- Redux used to store authentication state and to make it easy to add more global state options for your app
- Material-UI provided as a default UI library (can change easily)
- API handlers built in to easily make authenticated API calls
- Basic website built with app bar and left nav menu.

## Authentication Options

### LDAP Authentication
LDAP support provided by [django-auth-ldap](https://github.com/django-auth-ldap/django-auth-ldap)

To use LDAP authentication, you must set several environment variables properly. Below are the variables you must set, and their defaults.  Anything set by default is set up to work with default FreeIPA configuration, but probably works by default with other OpenLDAP providers like Active Directory.

Permissions such as staff and superuser status are evaluated each the time user logs in.  So if their LDAP group membership changes, it will change in Django the next time they attempt to login.

| **VARIABLE** | **DEFAULT** | **DESCRIPTION** | **EXAMPLE** |
|:--------|:------|:---------------|:-----------|
| LDAP_SERVER_URI | None | URI of the LDAP server | ldap://ipa.example.com
| LDAP_BIND_DN | None | Bind account for the LDAP server.  See about creating a bind user for free IPA [on their website[(https://www.freeipa.org/page/HowTo/LDAP#System_Accounts) | uid=system,cn=sysaccounts,cn=etc,dc=example,dc=com
| LDAP_BIND_PASS | None | Password for the bind user |  |
| LDAP_USER_SEARCH_BASE | None | search base for users in your LDAP structure | cn=users,cn=accounts,dc=example,dc=com
| LDAP_GROUP_SEARCH_FILTER | (objectClass=groupOfNames) | Filter to search for groups of user | \<Default set up for FreeIPA>
| LDAP_ATTR_FIRST_NAME | givenName | Attribute for first name | \<Default set up for FreeIPA and AD>
| LDAP_ATTR_LAST_NAME | sn | Attribute for last name | \<Default set up for FreeIPA and AD>
| LDAP_ATTR_EMAIL | mail | Attribute for user's email | \<Default set up for FreeIPA>
| LDAP_STAFF_GROUP | None | LDAP group that is given the staff permission in Django | cn=editors,cn=groups,cn=accounts,dc=example,dc=com
| LDAP_SUPERUSER_GROUP | None | LDAP group that is given the superuser permission in Django | cn=admins,cn=groups,cn=accounts,dc=example,dc=com


### Linux PAM Authentication
PAM support provided by [django-pam](https://github.com/cnobile2012/django-pam)

To use Linux PAM authentication, you must set `AUTH_PAM_ENABLED=true` in your environment variables.  

The user that runs the application needs to be a member of the /etc/shadow file group, this is usually the web server user. This is necessary so the server can authenticate other users. To do this run the command below with the proper user:

```$ sudo usermod -a -G shadow <user>```

## UI Development

Each feature of the frontend is nestled within its own folder to be self-contained.  Examples are provided to easily add more pages/features to your app, including adding navigation, pages, and redux state.


