# Generated by Django 3.2.7 on 2021-09-20 20:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('letsvpn', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='globalsettings',
            options={'verbose_name': 'LetsVPN Settings', 'verbose_name_plural': 'LetsVPN Settings'},
        ),
        migrations.AlterModelOptions(
            name='usersettings',
            options={'verbose_name': 'User Settings', 'verbose_name_plural': 'User Settings'},
        ),
        migrations.AlterModelOptions(
            name='wireguardpeer',
            options={'verbose_name': 'WireGuard Peer', 'verbose_name_plural': 'WireGuard Peers'},
        ),
        migrations.AlterModelOptions(
            name='wireguardserver',
            options={'verbose_name': 'WireGuard Server', 'verbose_name_plural': 'WireGuard Servers'},
        ),
    ]
