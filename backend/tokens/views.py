from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import TokenBalance, TokenTransaction
from .serializers import TokenBalanceSerializer


class UserTokenBalance(APIView):
    """
    Retrieve the token balance for the logged-in user.
    """

    def get(self, request, format=None):
        # Ensure the user is authenticated
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=401)

        # Retrieve the token balance for the authenticated user
        balance = get_object_or_404(TokenBalance, user=request.user)
        serializer = TokenBalanceSerializer(balance)
        return Response(serializer.data)


class UserTransactionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        transactions = TokenTransaction.objects.filter(
            models.Q(sender=user) | models.Q(recipient=user)
        ).order_by('-timestamp')  # Sorting by timestamp descending
        serializer = TokenTransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

