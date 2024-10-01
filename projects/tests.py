from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone

from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from projects.models import Project, ProjectMedia


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


class ProjectMediaViewTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a project
        cls.project = Project.objects.create(title="Test Project")
        # Create media items for the project
        cls.image_file = SimpleUploadedFile("image.jpg", b"image_content", content_type="image/jpeg")
        cls.video_file = SimpleUploadedFile("video.mp4", b"video_content", content_type="video/mp4")

        ProjectMedia.objects.create(
            project=cls.project,
            file=cls.image_file,
            file_type='image',
            thumbnail=SimpleUploadedFile("thumb.jpg", b"thumbnail_content", content_type="image/jpeg")
        )
        ProjectMedia.objects.create(
            project=cls.project,
            file=cls.video_file,
            file_type='video'
        )

    def test_get_project_media(self):
        """
        Ensure we can retrieve the media for a project.
        """
        url = reverse('project-media', kwargs={'project_id': self.project.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Check that two media items are returned

        # Check that the content matches what we expect
        expected_files = [self.image_file.name, self.video_file.name]
        returned_files = [media['file'] for media in response.data]
        self.assertTrue(set(expected_files).issubset(set(returned_files)))

    def test_get_project_media_no_project(self):
        """
        Test retrieving media for a non-existent project.
        """
        non_existent_project_id = self.project.pk + 999
        url = reverse('project-media', kwargs={'project_id': non_existent_project_id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_project_media_no_media(self):
        """
        Test the response when no media is associated with the project.
        """
        empty_project = Project.objects.create(title="Empty Project")
        url = reverse('project-media', kwargs={'project_id': empty_project.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # No media items should be returned
