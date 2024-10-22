from django.contrib import admin

from projects.models import Project, ProjectMedia


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'completion_percentage', 'created_at', 'updated_at')  # Fields to display in the admin list
    search_fields = ('title',)  # Fields to be searchable in the admin list
    readonly_fields = ('created_at', 'updated_at')  # Make these fields read-only


class ProjectMediaAdmin(admin.ModelAdmin):
    list_display = ('project', 'file_type', 'file', 'thumbnail')
    list_filter = ('file_type',)  # Add filters to the sidebar
    search_fields = ('project__title',)  # Enable search by project title


# Register your models here
admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectMedia, ProjectMediaAdmin)
