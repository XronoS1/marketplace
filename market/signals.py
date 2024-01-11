from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.mail import mail_managers, send_mail
from .models import Delivery, Comments, Product
from django.contrib.auth.models import User


@receiver(post_save, sender=Delivery)
def delivery_delete_signal(sender, instance, **kwargs):
    if instance.finished:
        d = Delivery.objects.get(pk=instance.pk)

        d.delete()


# @receiver(post_save, sender=Comments)
# def delivery_delete_signal(sender, instance, created, **kwargs):
#     if created:
#         all_comments = Comments.objects.filter(product=instance.product)
#
#         print(111111111, all_comments)
