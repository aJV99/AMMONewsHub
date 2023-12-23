from django.contrib import admin
from api.models import User, Profile, Article, Comment

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name']

class ArticleAdmin(admin.ModelAdmin):
    list_display = ['Article_title', 'Article_category']

class CommentAdmin(admin.ModelAdmin):
    list_display = ['user', 'article', 'text']

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Comment, CommentAdmin)