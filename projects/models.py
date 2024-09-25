from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
# from PIL import Image  Posiblemente si necesitamos thumbnails


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    completion_percentage = models.IntegerField(default=0)  # Represents 0% to 100%
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.completion_percentage}%)"


class ProjectMedia(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='media')
    file = models.FileField(upload_to='project_media/')
    file_type = models.CharField(max_length=5, choices=(('image', 'Image'), ('video', 'Video')))
    thumbnail = models.ImageField(upload_to='project_media/thumbnails/', blank=True, null=True)

    def __str__(self):
        return f"{self.project.title} - {self.file_type}"


# @receiver(post_save, sender=ProjectMedia)
# def create_thumbnail(sender, instance, created, **kwargs):
#     if created and instance.file.name.endswith(('.png', '.jpg', '.jpeg')):
#         img = Image.open(instance.file)
#         img.thumbnail((100, 100), Image.ANTIALIAS)
#         thumb_name = f"thumb_{instance.file.name}"
#         img.save(f'media/project_media/thumbnails/{thumb_name}')
#         instance.thumbnail = f'project_media/thumbnails/{thumb_name}'
#         instance.save()
