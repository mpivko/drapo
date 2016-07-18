# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-18 08:13
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contests', '0005_news'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='abstracttasksopeningpolicy',
            name='contest',
        ),
        migrations.RemoveField(
            model_name='abstracttasksopeningpolicy',
            name='polymorphic_ctype',
        ),
        migrations.RemoveField(
            model_name='bycategoriestasksopeningpolicy',
            name='abstracttasksopeningpolicy_ptr',
        ),
        migrations.DeleteModel(
            name='AbstractTasksOpeningPolicy',
        ),
        migrations.DeleteModel(
            name='ByCategoriesTasksOpeningPolicy',
        ),
    ]