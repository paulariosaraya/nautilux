# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import uuid

from django.db import models


class Intervention(models.Model):
    BROUILLON = 1
    VALIDE = 2
    TERMINE = 3

    statuts = (
        (BROUILLON, 'Brouillon'),
        (VALIDE, 'Validé'),
        (TERMINE, 'Terminé'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    libelle = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(max_length=300, null=True, blank=True)
    nom_intervenant = models.CharField(max_length=255, null=True, blank=True)
    date_intervention = models.DateField(null=True, blank=True)
    lieu = models.ForeignKey(
        'interventions.Ville',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    statut = models.IntegerField(
        choices=statuts,
        default=BROUILLON,
    )
    date_creation = models.DateTimeField(auto_now_add=True)


class Ville(models.Model):
    nom = models.CharField(max_length=255)
    departement = models.CharField(max_length=255)
    region = models.CharField(max_length=255)

    def __str__(self):
        return self.nom
