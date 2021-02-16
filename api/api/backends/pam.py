from django_pam.auth import backends
import grp, pwd

from api.settings.auth import AUTH_PAM_SUPERUSER_GROUP, AUTH_PAM_STAFF_GROUP


class GroupNotFound(KeyError):
    def __init__(self, msg='The group with that ID was not found on this system.', *args):
        super().__init__(msg, *args)


class PAMBackend(backends.PAMBackend):

    def authenticate(self, request, username=None, password=None, **extra_fields):
        django_user = super().authenticate(request, username=username, password=password, **extra_fields)
        if not django_user:
            return

        try:
            superuser_group = grp.getgrgid(AUTH_PAM_SUPERUSER_GROUP)
            staff_group = grp.getgrgid(AUTH_PAM_STAFF_GROUP)
            user = pwd.getpwnam(username)
        except KeyError:
            return

        # TODO: Make sure it will remove is_superuser and is_staff if user is no longer in that group

        # Check for superuser group membership
        for member in superuser_group.gr_mem:
            member_pw = pwd.getpwnam(member)
            if member_pw.pw_uid == user.pw_uid:
                django_user.is_superuser = True
                django_user.save()
                break
            if django_user.is_superuser:
                django_user.is_superuser = False
                django_user.save()

        # Check for staff group membership
        for member in staff_group.gr_mem:
            member_pw = pwd.getpwnam(member)
            if member_pw.pw_uid == user.pw_uid:
                django_user.is_staff = True
                django_user.save()
                break
            if django_user.is_staff:
                django_user.is_staff = False
                django_user.save()

        print(django_user)
        return django_user







