# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, filters

from interventions.models import Intervention, Ville
from interventions.serializers import InterventionSerializer, VilleSerializer, InterventionReadSerializer


class InterventionViewSet(viewsets.ModelViewSet):
    queryset = Intervention.objects.all()
    serializer_class = InterventionSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['date_creation']

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return InterventionReadSerializer
        return self.serializer_class


class VilleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Ville.objects.all()
    serializer_class = VilleSerializer
    pagination_class = None
