# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2024-05-20 11:04
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Intervention',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('libelle', models.CharField(blank=True, max_length=200, null=True)),
                ('description', models.TextField(blank=True, max_length=300, null=True)),
                ('nom_intervenant', models.CharField(blank=True, max_length=255, null=True)),
                ('date_intervention', models.DateField(blank=True, null=True)),
                ('statut', models.IntegerField(choices=[(1, 'Brouillon'), (2, 'Valid\xe9'), (3, 'Termin\xe9')], default=1)),
                ('date_creation', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ville',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=255)),
                ('departement', models.CharField(max_length=255)),
                ('region', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='intervention',
            name='lieu',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='interventions.Ville'),
        ),
    ]
