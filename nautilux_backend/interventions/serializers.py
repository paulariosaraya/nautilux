from rest_framework import serializers

from interventions.models import Intervention, Ville


class VilleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ville
        fields = [
            'id',
            'nom',
            'departement',
            'region',
        ]


class InterventionSerializer(serializers.HyperlinkedModelSerializer):
    lieu = serializers.PrimaryKeyRelatedField(
        queryset=Ville.objects.all(),
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Intervention
        fields = [
            'id',
            'libelle',
            'description',
            'nom_intervenant',
            'lieu',
            'date_intervention',
            'statut',
            'date_creation',
        ]


class InterventionReadSerializer(serializers.HyperlinkedModelSerializer):
    lieu = VilleSerializer()

    class Meta:
        model = Intervention
        fields = [
            'id',
            'libelle',
            'description',
            'nom_intervenant',
            'lieu',
            'date_intervention',
            'statut',
            'date_creation',
        ]