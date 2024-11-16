from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Q

from .models import TokenBalance, TokenTransaction, Address
from .serializers import TokenBalanceSerializer, TokenTransactionSerializer


class UserTokenBalance(APIView):
    """
    Retrieve the token balance for the logged-in user.
    """
    # permission_classes = [IsAuthenticated]  # Ensures the user is authenticated

    def get(self, request, format=None):
        """
        Return token balance of the authenticated user.
        """
        balance = get_object_or_404(TokenBalance, user=request.user)
        serializer = TokenBalanceSerializer(balance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserTransactionsView(APIView):
    def get(self, request):
        user = request.user
        # Retrieve all addresses associated with the user
        addresses = Address.objects.filter(user=user).values_list('address', flat=True)
        # Filter transactions where the user's addresses are either sender or recipient
        transactions = TokenTransaction.objects.filter(
            Q(sender__in=addresses) | Q(recipient__in=addresses)
        ).order_by('-timestamp')
        serializer = TokenTransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
