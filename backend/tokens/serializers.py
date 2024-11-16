from rest_framework import serializers
from tokens.models import TokenBalance, TokenTransaction
from profiles.serializers import UserSerializer

class TokenBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenBalance
        fields = '__all__'


class TokenTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenTransaction
        fields = ['id', 'sender', 'recipient', 'amount', 'timestamp', 'note', 'receipt']
