from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

from django.conf import settings
from django.middleware.csrf import get_token
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, authenticate, logout as django_logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect
from profiles.models import Profile
from profiles.serializers import UserSerializer, ProfileSerializer


@method_decorator(csrf_exempt, name='dispatch')
class Logout(APIView):
    def post(self, request):
        print("Logging out")
        django_logout(request)  # This will clear the session
        response = Response({'message': 'Logged out successfully'}, status=200)
        response.delete_cookie('jwt')  # Delete the JWT cookie
        return response


@method_decorator(csrf_exempt, name='dispatch')
class Login(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        print(f"username: {username}")
        password = request.data.get('password')
        print(f"password: {password}")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Redirect to set JWT token
            print(f"user: {user}")

            print('Creating refresh and access tokens for user:', user)
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            secure_flag = False

            # Define the cookie attributes
            cookie_attributes = {
                'key': 'jwt',
                'value': access_token,
                'httponly': True,
                'secure': secure_flag,  # TODO Set to False if testing locally over HTTP
                'samesite': 'None' if secure_flag else 'Lax',
                'path': '/',
                'max_age': None,  # Can specify max_age if needed
            }

            response = JsonResponse({
                'message': 'Logged in successfully',
            })

            response.set_cookie(**cookie_attributes)
            login(request, user)  # This actually logs the user in, attaching them to the session

            # Print all the cookie attributes
            print("Cookie attributes:", cookie_attributes)
            print(f"request.user.is_authenticated: {request.user.is_authenticated}")
            return response

        else:
            print("user not in database")
            return Response({'error': 'Invalid credentials'}, status=401)


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


class GetProfileData(APIView):
    # permission_classes = [IsAuthenticated]  # This ensures only authenticated users can access this view

    def get(self, request):
        """
        Retrieve and serialize the user data.
        """
        user = request.user
        user_serialized = UserSerializer(user)
        return Response(user_serialized.data)


def get_csrf(request):
    # Force CSRF token to be generated and set in the cookie
    print("GET CSRF TOKEN")
    get_token(request)
    return JsonResponse({'detail': 'CSRF cookie set'}, status=200)
