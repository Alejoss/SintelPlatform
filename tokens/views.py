from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import TokenBalance
from .serializers import TokenBalanceSerializer



class TokenBalanceList(APIView):
    """
    List all token balances.
    """
    def get(self, request, format=None):
        balances = TokenBalance.objects.all()
        serializer = TokenBalanceSerializer(balances, many=True)
        return Response(serializer.data)

class TokenBalanceDetail(APIView):
    """
    Retrieve a token balance instance.
    """
    def get(self, request, pk, format=None):
        balance = get_object_or_404(TokenBalance, pk=pk)
        serializer = TokenBalanceSerializer(balance)
        return Response(serializer.data)
