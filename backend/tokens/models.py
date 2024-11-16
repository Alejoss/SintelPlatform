from django.db import models
from django.contrib.auth.models import User


class Address(models.Model):
    user = models.ForeignKey(User, related_name='addresses', on_delete=models.CASCADE)
    address = models.CharField(max_length=64)  # Assuming SHA256 string length
    label = models.CharField(max_length=100, blank=True)  # Optional label for the address
    # TODO ADDRESS VALIDATION FIELD

    def __str__(self):
        return f"{self.label} ({self.address}) - User: {self.user.username}"


class TokenBalance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='token_balance')
    balance = models.DecimalField(max_digits=19, decimal_places=4)  # Adjust precision as needed

    def __str__(self):
        return f"{self.user.username} - Balance: {self.balance}"


class TokenTransaction(models.Model):
    sender = models.ForeignKey(Address, related_name='sent_transactions', on_delete=models.CASCADE)
    recipient = models.ForeignKey(Address, related_name='received_transactions', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=19, decimal_places=4)
    timestamp = models.DateTimeField(auto_now_add=True)
    note = models.TextField(blank=True, null=True)
    receipt = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Transaction from {self.sender} to {self.recipient} - Amount: {self.amount}"
