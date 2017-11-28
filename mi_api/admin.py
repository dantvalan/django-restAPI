from django.contrib import admin
from mi_api.models import *
 
 
class catalogoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')
    list_display_links = ('id', 'nombre')

class areaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')
    list_display_links = ('id', 'nombre')
 
class itemAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')
    list_display_links = ('id', 'nombre')
     

  
admin.site.register(Catalogo, catalogoAdmin)
admin.site.register(Area, areaAdmin)
admin.site.register(Items, itemAdmin)

