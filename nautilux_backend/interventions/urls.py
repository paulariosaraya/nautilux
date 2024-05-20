from django.conf.urls import url, include
from rest_framework import routers

from interventions.views import InterventionViewSet, VilleViewSet

router = routers.DefaultRouter()
router.register(r'villes', VilleViewSet)
router.register(r'', InterventionViewSet)

urlpatterns = [
    url(r'', include(router.urls)),
]
