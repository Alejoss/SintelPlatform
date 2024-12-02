from rest_framework import serializers
from projects.models import Project, ProjectMedia


class ProjectMediaSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = ProjectMedia
        fields = ['id', 'project', 'file_url', 'file_type', 'thumbnail']

    def get_file_url(self, obj):
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.file.url)
        return obj.file.url


class ProjectSerializer(serializers.ModelSerializer):
    media = ProjectMediaSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'completion_percentage', 'created_at',
                  'updated_at', 'media', 'note']
