from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Q

from .models import TokenBalance, TokenTransaction
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
    """
    Retrieve all transactions where the logged-in user is either the sender or the recipient.
    """
    # permission_classes = [IsAuthenticated]  # Ensures the user is authenticated

    def get(self, request):
        """
        Return transactions involving the authenticated user, either as sender or recipient.
        """
        user = request.user
        transactions = TokenTransaction.objects.filter(
            Q(sender=user) | Q(recipient=user)
        ).order_by('-timestamp')  # Sorting by timestamp descending
        serializer = TokenTransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
