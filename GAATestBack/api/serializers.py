from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact              # Modèle associé
        fields = '__all__'           # Inclure tous les champs du modèle dans la sérialisation