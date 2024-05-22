# coding=utf-8
from django.db.models.signals import post_save
from django.dispatch import receiver

from interventions.models import Intervention


# Récepteur pour le signal post_save du modèle Intervention, exécuté à chaque fois qu'une sauvegarde est effectuée
@receiver(post_save, sender=Intervention)
def update_statut(sender, instance, **kwargs):
    # Vérifier si l'intervention est en statut "Brouillon" et si tous les champs facultatifs sont remplis
    if (instance.statut == Intervention.BROUILLON and instance.libelle
            and instance.description
            and instance.nom_intervenant
            and instance.date_intervention):
        # Si toutes les conditions sont remplies, le statut doit être changé à "Validé"
        Intervention.objects.filter(id=instance.id).update(statut=Intervention.VALIDE)
