from django.contrib import admin
from django.urls import path

from projects.views import ProjectView
from tokens.views import UserTokenBalance, UserTransactionsView
from profiles.views import (UserDetail, ProfileDetail, Login, Logout, set_jwt_token,
                            get_csrf, get_profile_data)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', Login.as_view(), name='login'),
    path('logout/', Logout.as_view(), name='logout'),
    path('set_jwt_token/', set_jwt_token, name="set_jwt_token"),
    path('get-csrf/', get_csrf, name='get-csrf'),
    path('get_profile_data/', get_profile_data, name='get_profile_data'),

    path('project/', ProjectView.as_view(), name='project'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('profiles/<int:pk>/', ProfileDetail.as_view(), name='profile-detail'),
    path('my-token-balance/', UserTokenBalance.as_view(), name='my-token-balance'),
    path('my-token-transaction/', UserTransactionsView.as_view(), name='my-token-transactions'),
]
