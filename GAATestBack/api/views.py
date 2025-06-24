from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer

class ContactListCreateView(generics.ListCreateAPIView):
    """
    Vue API permettant :
    - d'obtenir la liste de tous les contacts (GET)
    - d'ajouter un nouveau contact (POST)
    """
    queryset = Contact.objects.all()           # Tous les contacts de la base
    serializer_class = ContactSerializer       # Sérialiseur utilisé pour la conversion

    def perform_create(self, serializer):
        """
        Lors de la création d'un contact (POST), ajoute automatiquement l'adresse IP du client.
        """
        ip = self.request.META.get('REMOTE_ADDR')  # Récupère l'IP du client depuis la requête
        serializer.save(ip=ip)        # Enregistre le contact avec l'IP