from web3 import Web3

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

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
        infura_project_id = "db26d321185243db9d29d384b55dba3c"
        user = request.user
        # Connect to Ethereum node
        infura_url = "https://mainnet.infura.io/v3/{}".format(infura_project_id)
        web3 = Web3(Web3.HTTPProvider(infura_url))

        if not web3.isConnected():
            return Response({"error": "Failed to connect to Ethereum network"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Retrieve all address IDs associated with the user
        address_ids = Address.objects.filter(user=user).values_list('id', flat=True)
        addresses = Address.objects.filter(id__in=address_ids).values_list('address', flat=True)

        transactions = []
        for address in addresses:
            # Fetch transactions for each address
            txs = web3.eth.get_transaction_by_address(address)
            transactions.extend(txs)

        # Serialize and return the transactions
        serializer = TokenTransactionSerializer(transactions, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
