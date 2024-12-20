from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.db.models import Q

from .models import TokenBalance, TokenTransaction, Address
from .serializers import TokenBalanceSerializer, TokenTransactionSerializer


from tokens.models import TokenBalance
from tokens.serializers import TokenBalanceSerializer


class UserTokenBalance(APIView):
    """
    Retrieve the token balance for the logged-in user.
    """
    permission_classes = [IsAuthenticated]  # Ensures the user is authenticated

    def get(self, request, format=None):
        """
        Return token balance of the authenticated user. Create if it doesn't exist.
        """
        balance, created = TokenBalance.objects.get_or_create(user=request.user, defaults={'balance': 0.0})
        serializer = TokenBalanceSerializer(balance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserTransactionsView(APIView):
    def get(self, request):
        user = request.user
        # Retrieve all address IDs associated with the user
        address_ids = Address.objects.filter(user=user).values_list('id', flat=True)
        # Filter transactions where the user's addresses are either sender or recipient
        transactions = TokenTransaction.objects.filter(
            Q(sender__in=address_ids) | Q(recipient__in=address_ids)
        ).order_by('-timestamp')
        serializer = TokenTransactionSerializer(transactions, many=True)
        print(f"serializer.data: {serializer.data}")
        return Response(serializer.data, status=status.HTTP_200_OK)
