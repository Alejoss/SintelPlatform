from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from projects.models import Project, ProjectMedia
from projects.serializers import ProjectSerializer, ProjectMediaSerializer



class ProjectDetail(APIView):
    """
    Retrieve a project instance.
    """
    def get(self, request, pk, format=None):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)


class ProjectMediaView(APIView):
    """
    Retrieve all media related to a specific project.
    """
    def get(self, request, project_id, format=None):
        # First, ensure the project exists
        get_object_or_404(Project, pk=project_id)
        # Retrieve all media related to the project
        media = ProjectMedia.objects.filter(project_id=project_id)
        serializer = ProjectMediaSerializer(media, many=True)
        return Response(serializer.data)


class ProjectMediaDetail(APIView):
    """
    Retrieve a project media instance.
    """
    def get(self, request, pk, format=None):
        media = get_object_or_404(ProjectMedia, pk=pk)
        serializer = ProjectMediaSerializer(media)
        return Response(serializer.data)
