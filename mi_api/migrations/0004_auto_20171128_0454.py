# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-28 04:54
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mi_api', '0003_auto_20171127_2236'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='catalogo',
            name='area',
        ),
        migrations.AddField(
            model_name='items',
            name='area',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='mi_api.Area'),
        ),
        migrations.AlterField(
            model_name='area',
            name='item',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='mi_api.Catalogo'),
        ),
    ]
