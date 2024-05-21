# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.utils import timezone
from rest_framework import viewsets, filters
from rest_framework.exceptions import PermissionDenied

from interventions.models import Intervention, Ville
from interventions.serializers import InterventionSerializer, VilleSerializer, InterventionReadSerializer


def verify_and_update_statuts():
    today = timezone.localdate()
    Intervention.objects.exclude(statut=Intervention.TERMINE).filter(
        date_intervention__lt=today,
    ).update(statut=Intervention.TERMINE)


class InterventionViewSet(viewsets.ModelViewSet):
    queryset = Intervention.objects.all()
    serializer_class = InterventionSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['date_creation']

    def list(self, request, *args, **kwargs):
        verify_and_update_statuts()
        return super(InterventionViewSet, self).list(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.statut == Intervention.TERMINE:
            raise PermissionDenied(detail="L'intervention n'est plus modifiable")
        return super(InterventionViewSet, self).update(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return InterventionReadSerializer
        return self.serializer_class


class VilleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Ville.objects.all()
    serializer_class = VilleSerializer
    pagination_class = None
