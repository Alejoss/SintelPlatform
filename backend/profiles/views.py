from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect

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



def set_jwt_token(request):
    user = request.user

    # Debug: Check if user is authenticated
    print('User authenticated:', user.is_authenticated)

    if not user.is_authenticated:
        print('User not authenticated, returning error.')
        return JsonResponse({'error': 'User not authenticated'}, status=401)

    # Debug: Log that the tokens are being created
    print('Creating refresh and access tokens for user:', user)
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    # Debug: Log the setting of the JWT cookie
    # Define the cookie attributes
    cookie_attributes = {
        'key': 'jwt',
        'value': access_token,
        'httponly': True,
        'secure': False,  # Set to False if testing locally over HTTP
        'samesite': 'Lax',
        'path': '/',
        'max_age': None,  # Can specify max_age if needed
    }

    # Print all the cookie attributes
    print("Cookie attributes:", cookie_attributes)

    # Set the cookie with the specified attributes
    redirect_url = "http://localhost:5173/profiles/login_successful"
    response = HttpResponseRedirect(redirect_url)
    print(f'Redirecting to {redirect_url} with JWT token cookie.')

    response.set_cookie(
        cookie_attributes['key'],
        cookie_attributes['value'],
        httponly=cookie_attributes['httponly'],
        secure=cookie_attributes['secure'],
        samesite=cookie_attributes['samesite'],
        path=cookie_attributes['path'],
        max_age=cookie_attributes['max_age'],
    )

    return response
