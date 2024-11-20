from rest_framework import serializers
from tokens.models import TokenBalance, TokenTransaction, Address
from profiles.serializers import UserSerializer


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class TokenBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenBalance
        fields = '__all__'


class TokenTransactionSerializer(serializers.ModelSerializer):
    sender = AddressSerializer(read_only=True)
    recipient = AddressSerializer(read_only=True)

    class Meta:
        model = TokenTransaction
        fields = ['id', 'sender', 'recipient', 'amount', 'timestamp', 'note', 'receipt']
