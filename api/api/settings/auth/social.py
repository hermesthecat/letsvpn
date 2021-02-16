
SOCIAL_AUTH_POSTGRES_JSONFIELD = True

for key in ['GOOGLE_OAUTH2_KEY', 'GOOGLE_OAUTH2_SECRET',]:
    # Use exec instead of eval here because we're not just trying to evaluate a dynamic value here;
    # we're setting a module attribute whose name varies.
    exec("SOCIAL_AUTH_{key} = os.environ.get('{key}')".format(key=key))
SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    'social_core.pipeline.social_auth.associate_by_email',
    'social_core.pipeline.user.create_user',
    'discordapi.MyAppProfile.pipeline.populate_profile',
    #'api.pipeline.create_first_admin',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
)

