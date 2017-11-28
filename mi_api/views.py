from mi_api.models import *
from django.http import Http404, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from django.template import RequestContext, loader




def verCatalogos(request):
    # logg().debug("Generando un registro en el log de Django")
    template = loader.get_template("verCatalogos.html")
    context = {
        'titulo': "Admin Incidencias",
    }
    return HttpResponse(template.render(context))

@permission_classes((permissions.AllowAny,))
class catalogos(APIView):

	def get(self, request, format=None):
		cat = Catalogo.objects.all()
		content = { 'catalogos': [ obj.rJSON() for obj in cat ] }
		return Response(content)

	def post(self, request, format=None):
		data = request.data
		try:
			if "catalogo" in data:
				for c in data["catalogo"]:
					new_catalogo = Catalogo()
					if "nombre" in c:
						new_catalogo.nombre = c["nombre"]
					new_catalogo.save()
				return Response(new_catalogo.rJSON())
			else:
				return Response("el catalogo es obligatorio", status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

@permission_classes((permissions.AllowAny,))
class catalogosDetail(APIView):

	def get(self, request, id, format=None):
		try:
			cat = Catalogo.objects.get(pk = id)
			return Response(cat.rJSON())
		except Catalogo.DoesNotExist:
			return Response("El Catalogo no existe.", status=status.HTTP_404_NOT_FOUND)


	def put(self, request, id, format=None):
		data = request.data
		try:
			if "catalogo" in data:
				for c in data["catalogo"]:
					if id:
						up_catalogo = Catalogo.objects.get(pk = id)
						if "nombre" in c:
							up_catalogo.nombre = c["nombre"]
						up_catalogo.save()
						return Response(up_catalogo.rJSON())
					else:
						return Response("el id del catalogo", status=status.HTTP_400_BAD_REQUEST)
			else:
				return Response("el catalogo es obligatorio", status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


	def delete(self, request, id, format=None):
		data = request.data
		try:
			if id:
				d_catalogo = Catalogo.objects.get(pk = id)
				d_catalogo.delete()
				return Response(status=status.HTTP_204_NO_CONTENT)
			else:
				return Response("el id del catalogo", status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


@permission_classes((permissions.AllowAny,))
class Areas(APIView):

	def get(self, request, format=None):
		cat = Area.objects.all()
		content = { 'Areas': [ obj.rJSON() for obj in cat ] }
		return Response(content)

	def post(self, request, format=None):
		data = request.data
		try:
			if "Area" in data:
				for c in data["Area"]:
					new_Area = Area()
					if "nombre" in c:
						new_Area.nombre = c["nombre"]
					if "catalogo_id" in c:
						new_Area.catalogo = Catalogo.objects.get(id=c["catalogo_id"])
					new_Area.save()
				return Response(new_Area.rJSON())
			else:
				return Response("el Area es obligatorio", status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

@permission_classes((permissions.AllowAny,))
class AreasDetail(APIView):

	def get(self, request, id, format=None):
		try:
			ar = Area.objects.filter(catalogo__id = id)
			content = { 'Areas': [ obj.rJSON() for obj in ar ] }
			return Response(content)
		except Area.DoesNotExist:
			return Response("El Area no existe.", status=status.HTTP_404_NOT_FOUND)

	def put(self, request, id, format=None):
		data = request.data
		try:
			if "Area" in data:
				for c in data["Area"]:
					if id:
						up_Area = Area.objects.get(pk = id)
						if "nombre" in c:
							up_Area.nombre = c["nombre"]
						if "catalogo_id" in c:
							up_Area.catalogo = Catalogo.objects.get(id=c["catalogo_id"])
						up_Area.save()
						return Response(up_Area.rJSON())
					else:
						return Response("el id del Area", status=status.HTTP_400_BAD_REQUEST)
			else:
				return Response("el Area es obligatorio", status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


	def delete(self, request, id, format=None):
		data = request.data
		try:
			if id:
				d_Area = Area.objects.get(pk = id)
				d_Area.delete()
				return Response(status=status.HTTP_204_NO_CONTENT)
			else:
				return Response("el id del Area", status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


@permission_classes((permissions.AllowAny,))
class Item(APIView):

	def get(self, request, format=None):
		cat = Items.objects.all()
		content = { 'Items': [ obj.rJSON() for obj in cat ] }
		return Response(content)

	def post(self, request, format=None):
		data = request.data
		try:
			if "Items" in data:
				for c in data["Items"]:
					new_Items = Items()
					if "nombre" in c:
						new_Items.nombre = c["nombre"]
					if "area_id" in c:
						new_Items.area = Area.objects.get(pk = c["area_id"])
					new_Items.save()
				return Response(new_Items.rJSON())
			else:
				return Response("el Items es obligatorio", status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

@permission_classes((permissions.AllowAny,))
class ItemDetail(APIView):

	def get(self, request, id, format=None):
		try:
			itm = Items.objects.filter(area__id = id)
			content = { 'Items': [ obj.rJSON() for obj in itm ] }
			return Response(content)
		except Items.DoesNotExist:
			return Response("El Item no existe.", status=status.HTTP_404_NOT_FOUND)

	def put(self, request, id, format=None):
		data = request.data
		try:
			if "Items" in data:
				for c in data["Items"]:
					if id:
						up_Items = Items.objects.get(pk = id)
						if "nombre" in c:
							up_Items.nombre = c["nombre"]
						if "area_id" in c:
							up_Items.area = Area.objects.get(pk = c["area_id"])
						up_Items.save()
						return Response(up_Items.rJSON())
					else:
						return Response("el id del Items", status=status.HTTP_400_BAD_REQUEST)
			else:
				return Response("el Items es obligatorio", status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


	def delete(self, request, id, format=None):
		data = request.data
		try:
			if id:
				d_Items = Items.objects.get(pk = id)
				d_Items.delete()
				return Response(status=status.HTTP_204_NO_CONTENT)
			else:
				return Response("el id del Items", status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
			
		