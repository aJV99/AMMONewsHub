# Generated by Django 4.2.6 on 2023-12-12 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_comment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='article',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='parent_comment',
        ),
        migrations.AddField(
            model_name='article',
            name='Comments',
            field=models.ManyToManyField(to='api.comment'),
        ),
        migrations.AddField(
            model_name='comment',
            name='children_comments',
            field=models.ManyToManyField(to='api.comment'),
        ),
    ]