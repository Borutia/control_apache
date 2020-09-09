from django.urls import path
from control.views import Control_service

urlpatterns = [
    path('', Control_service.as_view())
]

