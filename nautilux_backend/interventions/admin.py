# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from interventions.models import Intervention, Ville


@admin.register(Intervention)
class InterventionAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'libelle',
        'nom_intervenant',
        'date_intervention',
        'lieu',
        'statut',
        'date_creation',
    )


@admin.register(Ville)
class VilleAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'departement', 'region')
