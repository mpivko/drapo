# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-04 17:52
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_emailconfirmation'),
    ]

    operations = [
        migrations.RenameField(
            model_name='emailconfirmation',
            old_name='confirmed',
            new_name='is_confirmed',
        ),
    ]
