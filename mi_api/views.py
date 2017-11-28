from mi_api.models import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions


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
					if "area_id" in c:
						new_catalogo.area = Area.objects.get(id=c["area_id"])
					new_catalogo.save()
				return Response(new_catalogo.rJSON())
			else:
				return Response("el catalogo es obligatorio", status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


	def put(self, request, format=None):
		data = request.data
		try:
			if "catalogo" in data:
				for c in data["catalogo"]:
					if "id" in c:
						up_catalogo = Catalogo.objects.get(pk = c["id"])
						if "nombre" in c:
							up_catalogo.nombre = c["nombre"]
						if "area_id" in c:
							up_catalogo.area = Area.objects.get(id=c["area_id"])
						up_catalogo.save()
						return Response(up_catalogo.rJSON())
					else:
						return Response("el id del catalogo", status=status.HTTP_400_BAD_REQUEST)
			else:
				return Response("el catalogo es obligatorio", status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


	def delete(self, request, format=None):
		data = request.data
		try:
			if "catalogo" in data:
				for c in data["catalogo"]:
					if "id" in c:
						d_catalogo = Catalogo.objects.get(pk = c["id"])
						d_catalogo.delete()
						return Response(status=status.HTTP_204_NO_CONTENT)
					else:
						return Response("el id del catalogo", status=status.HTTP_400_BAD_REQUEST)
			else:
				return Response("el catalogo es obligatorio", status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
			
		