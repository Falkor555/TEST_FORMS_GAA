from django.db import models

class Contact(models.Model):
    # Adresse email du contact (champ obligatoire, validé par Django)
    email = models.EmailField()

    # Adresse postale du contact
    address = models.CharField(max_length=255)

    # Nom de famille du contact
    last_name = models.CharField(max_length=100)

    # Prénom du contact
    first_name = models.CharField(max_length=100)

    # Date et heure de création du contact (remplie automatiquement à la création)
    created_at = models.DateTimeField(auto_now_add=True)

    # Adresse IP ayant créé le contact
    ip = models.GenericIPAddressField(blank=True, null=True)
