from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

from projects.models import Project, ProjectMedia
from projects.serializers import ProjectSerializer, ProjectMediaSerializer


class ProjectView(APIView):
    """
    Retrieve the single project instance.
    """

    def get(self, request, format=None):
        project = Project.get_instance()  # Always fetches the singleton instance
        serializer = ProjectSerializer(project)
        return Response(serializer.data)


class ProjectMediaListView(APIView):
    def get(self, request):
        media = ProjectMedia.objects.all()
        serializer = ProjectMediaSerializer(media, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProjectMediaDetail(APIView):
    """
    Retrieve a project media instance.
    """
    def get(self, request, pk, format=None):
        media = get_object_or_404(ProjectMedia, pk=pk)
        serializer = ProjectMediaSerializer(media)
        return Response(serializer.data)
