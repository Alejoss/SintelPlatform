from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import Project
from django.utils import timezone

class ProjectViewTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # Create initial project instance if not testing the creation itself
        Project.objects.create(
            title="Initial Project",
            description="A detailed description of the initial project.",
            completion_percentage=75,
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

    def test_get_project(self):
        """
        Ensure we can retrieve the project instance.
        """
        url = reverse('project-detail')  # Assuming the url name is 'project-detail'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check some key details in the response data
        project = Project.get_instance()
        expected_data = {
            'title': project.title,
            'description': project.description,
            'completion_percentage': project.completion_percentage
        }

        # Only checking for keys and not the entire serialization detail to keep test simple
        for key, value in expected_data.items():
            self.assertEqual(response.data[key], value)

    def test_get_project_creates_new_if_none_exists(self):
        """
        Ensure that if no project exists, one is created and returned.
        """
        Project.objects.all().delete()  # Ensure no projects exist

        url = reverse('project-detail')  # Assuming the url name is 'project-detail'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if a project now exists
        self.assertEqual(Project.objects.count(), 1)
        new_project = Project.objects.first()
        expected_data = {
            'title': new_project.title,
            'description': new_project.description,
            'completion_percentage': new_project.completion_percentage
        }

        for key, value in expected_data.items():
            self.assertEqual(response.data[key], value)

