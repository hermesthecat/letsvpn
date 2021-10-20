# Generated by Django 3.2.7 on 2021-10-16 01:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('letsvpn', '0006_wireguardserver_enabled'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wireguardserver',
            name='enabled',
            field=models.BooleanField(default=True, help_text='Is this server enabled? (Will not start server when disabled)', verbose_name='Enabled'),
        ),
    ]
