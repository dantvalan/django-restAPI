"""composeexample URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework.urlpatterns import format_suffix_patterns
from mi_api import views

urlpatterns = [
    url(r'^$', views.verCatalogos, name='verCatalogos'),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^catalogos/',views.catalogos.as_view() ),
    url(r'^catalogo/(?P<id>[0-9]+)/$', views.catalogosDetail.as_view()),
    url(r'^areas/',views.Areas.as_view() ),
    url(r'^area/(?P<id>[0-9]+)/$', views.AreasDetail.as_view()),
    url(r'^items/',views.Item.as_view() ),
    url(r'^item/(?P<id>[0-9]+)/$', views.ItemDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
