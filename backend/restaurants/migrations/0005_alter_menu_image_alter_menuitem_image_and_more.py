# Generated by Django 5.0.6 on 2025-03-27 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0004_remove_menuitem_image_url_menu_image_menuitem_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='image',
            field=models.ImageField(blank=True, default='default.jpg', null=True, upload_to='menu/'),
        ),
        migrations.AlterField(
            model_name='menuitem',
            name='image',
            field=models.ImageField(blank=True, default='default.jpg', null=True, upload_to='menu_items/'),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='logo',
            field=models.ImageField(blank=True, default='default.jpg', null=True, upload_to='vendor_logos/'),
        ),
    ]
