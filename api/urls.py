from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse
from django.conf.urls.static import static

from . import views

app_name = "api"

urlpatterns = [
    path("main/", views.main_spa, name="main"),
    path("login/", views.loginUser, name="login"),
    path("logout/", views.logoutUser, name="logout"),
    path("", views.registerUser, name="register"),
    path("profile/", views.get_profile, name="get_profile"),
    path("profile/update/", views.update_profile, name="update_profile"),
    path("articles/", views.get_articles, name="get_articles"),
    path("articles/<int:article_id>", views.get_article, name="get_article"),
    path("articles/<int:article_id>/comments/<int:comment_id>", views.handle_comment, name="handle_comment"),
    path("articles/<int:article_id>/comments", views.handle_comments, name="handle_comments"),
    path('profile/upload-image/', views.upload_profile_image, name='upload_profile_image'),
    path('profile/reset-image/', views.reset_profile_image_to_default, name='reset_profile_image_to_default'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
