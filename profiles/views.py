from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from profiles.models import Profile
from profiles.serializers import UserSerializer, ProfileSerializer


class UserDetail(APIView):
    """
    Retrieve a user instance.
    """
    def get(self, request, pk, format=None):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class ProfileDetail(APIView):
    """
    Retrieve a profile instance.
    """
    def get(self, request, pk, format=None):
        profile = get_object_or_404(Profile, pk=pk)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
