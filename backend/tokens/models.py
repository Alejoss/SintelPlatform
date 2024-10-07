from django.db import models
from django.contrib.auth.models import User


class TokenBalance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='token_balance')
    balance = models.DecimalField(max_digits=19, decimal_places=4)  # Adjust precision as needed

    def __str__(self):
        return f"{self.user.username} - Balance: {self.balance}"


class TokenTransaction(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_transactions')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_transactions')
    amount = models.DecimalField(max_digits=19, decimal_places=4)
    timestamp = models.DateTimeField(auto_now_add=True)
    note = models.TextField(blank=True, null=True)
    receipt = models.TextField(blank=True, null=True)

    def __str__(self):
        sender_username = self.sender.username if self.sender else 'System'
        recipient_username = self.recipient.username if self.recipient else 'System'
        return f"Transaction from {sender_username} to {recipient_username} - Amount: {self.amount}"
