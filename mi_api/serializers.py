from rest_framework import serializers
from mi_api.models import *

class MyModeloSerializer(serializers.Serializer):
	id = serializers.IntegerField(read_only=True)
	nombre = serializers.CharField(required=False, allow_blank=True, max_length=32)
	language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default="python")
	style = serializers.ChoiceField(choices=STYLE_CHOICES, default="friendly")

	def create(self, validated_data):
		return mi_modelo.objects.create(**validated_data)

	def update(self, instance, validated_data):
		instance.nombre = validated_data.get('nombre', instance.nombre)
		instance.language = validated_data.get('language', instance.language)
		instance.style = validated_data.get('style', instance.language)
		instance.save()
		return instance