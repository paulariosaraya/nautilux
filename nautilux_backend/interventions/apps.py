# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.apps import AppConfig


class InterventionsConfig(AppConfig):
    name = 'interventions'

    def ready(self):
        import interventions.signals
