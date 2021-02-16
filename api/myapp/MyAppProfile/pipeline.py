
'''
def populate_profile(backend, user, response, *args, **kwargs):
    print(f'Populate Profile: {kwargs}')
    profile = user.discord_profile
    profile.discord_id = kwargs['uid']
    profile.discord_discriminator = response['discriminator']
    profile.discord_username = kwargs['details']['username']
    profile.discord_avatar = response['avatar']
    profile.discord_access_token = response['access_token']
    profile.save()
'''