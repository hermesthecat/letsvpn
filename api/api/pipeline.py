from api.models import User


def create_first_admin(backend, user: User, response, *args, **kwargs):
    all_users = User.objects.all()
    first_user = user

    if len(all_users) == 1:
        first_user.is_admin = True
        first_user.is_staff = True
        first_user.is_superuser = True

    first_user.save()
