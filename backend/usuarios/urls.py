# usuarios/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegistroView, LoginView

urlpatterns = [
    path("registro/", RegistroView.as_view(), name="registro"),
    path("login/", LoginView.as_view(), name="token_obtain_pair"),  
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
