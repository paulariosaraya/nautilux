from django.db.models.signals import post_save
from django.dispatch import receiver

from interventions.models import Intervention


@receiver(post_save, sender=Intervention)
def update_statut(sender, instance, **kwargs):
    if (instance.statut == Intervention.BROUILLON and instance.libelle
            and instance.description
            and instance.nom_intervenant
            and instance.date_intervention):
        # Statut should be changed
        Intervention.objects.filter(id=instance.id).update(statut=Intervention.VALIDE)
