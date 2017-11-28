from django.db import models

class Catalogo(models.Model):
	nombre = models.CharField(max_length=1024, blank=True)

	class Meta:
		ordering = ["id"]

	def __str__(self):
		return self.nombre

	def rJSON(self):
		return{
		 "id": self.id,
		 "nombre": self.nombre
		}

class Area(models.Model):
	nombre = models.CharField(max_length=1024, blank=True)
	catalogo = models.ForeignKey("Catalogo", null=True)

	class Meta:
		ordering = ["id"]

	def __str__(self):
		return self.nombre

	def rJSON(self):
		return{
		 "id": self.id,
		 "nombre": self.nombre,
		 "catalogo": self.catalogo.nombre if self.catalogo else "",
		}

class Items(models.Model):
	nombre = models.CharField(max_length=1024, blank=True)
	area = models.ForeignKey("Area", null=True)

	class Meta:
		ordering = ["id"]

	def __str__(self):
		return self.nombre

	def rJSON(self):
		return{
		 "id": self.id,
		 "nombre": self.nombre,
		 "area": self.area.nombre if self.area else "",
		}
		
			
		

		
	
		