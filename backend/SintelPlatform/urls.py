from django.contrib import admin
from django.urls import path

from projects.views import ProjectView
from tokens.views import UserTokenBalance, UserTransactionsView
from profiles.views import UserDetail, ProfileDetail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('project/', ProjectView.as_view(), name='project'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('profiles/<int:pk>/', ProfileDetail.as_view(), name='profile-detail'),
    path('my-token-balance/', UserTokenBalance.as_view(), name='my-token-balance'),
    path('my-token-transaction/', UserTransactionsView.as_view(), name='my-token-balance'),
]
