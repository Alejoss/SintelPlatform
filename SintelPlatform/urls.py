from django.contrib import admin
from django.urls import path
from projects.views import ProjectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('project/', ProjectView.as_view(), name='project'),

    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('profiles/', ProfileList.as_view(), name='profile-list'),
    path('profiles/<int:pk>/', ProfileDetail.as_view(), name='profile-detail'),
]
