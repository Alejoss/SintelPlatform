from django.contrib import admin
from django.contrib.auth.models import User
from profiles.models import Profile

admin.site.site_header = "Sintel Administration"
admin.site.site_title = "Sintel Site Admin"
admin.site.index_title = "Site Administration"


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_email')
    search_fields = ('user__username', 'user__email')

    def get_email(self, obj):
        return obj.user.email

    get_email.admin_order_field = 'user__email'  # Allows column order sorting
    get_email.short_description = 'Email'  # Renames the column head


admin.site.register(Profile, ProfileAdmin)
