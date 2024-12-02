from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    completion_percentage = models.IntegerField(default=0)  # Represents 0% to 100%
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs):
        if Project.objects.exists() and not self.pk:
            # If any instance exists, and we're trying to create another one, raise an exception
            raise Exception("You can only create one instance of the Project model.")
        return super(Project, self).save(*args, **kwargs)

    @classmethod
    def get_instance(cls):
        # Returns the existing instance or creates a new one if it doesn't exist
        instance, created = cls.objects.get_or_create(pk=1)
        return instance

    def __str__(self):
        return f"{self.title}"


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
