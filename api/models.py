from django.db import models

from django.contrib.auth.models import AbstractUser

from django.db.models.signals import post_save

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100)

    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
    

class Profile(models.Model):
    '''
    We create a OneToOne relationship between User and Profile
    because we want One User to have only One Profile
    '''
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    full_name = models.CharField(max_length=300)
    bio = models.CharField(max_length=300)
    image = models.ImageField(default="profiles/defaultprofile.jpeg", upload_to="profiles/")

    def __str__(self):
        return self.full_name



'''
Automatically create a profile for a user whenever they 
create an account using Django signal
'''
def create_user_profile(sender, instance, created, **kwargs):
    #If the user is created, we want to create profile for them
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)


