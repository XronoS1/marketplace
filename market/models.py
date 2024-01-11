from django.db import models
from django.contrib.auth.models import User
from django.db.models import Sum


# Create your models here.
class Category (models.Model):
    name = models.CharField(max_length=50)


class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    rate = models.IntegerField(default=0)
    count = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    photo = models.ImageField(blank=True, null=True)

    category = models.ForeignKey(Category, on_delete=models.PROTECT)

    def update_rate(self):
        for c in Comments.objects.filter(product=self):
            self.rate += c.rate
        self.rate /= len(Comments.objects.filter(product=self))
        # self.rate = (Comments.objects.filter(product=self).aggregate(Sum, 'rate')).get('rate__sum')
        self.save()


class Comments(models.Model):
    comment = models.TextField()
    rate = models.IntegerField(default=1)

    user = models.ForeignKey(User, on_delete=models.PROTECT)
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='comments')



class Data(models.Model):
    address = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)

    user = models.OneToOneField(User, on_delete=models.PROTECT)


class Delivery(models.Model):
    finished = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    quantity = models.PositiveIntegerField(default=1)

    data = models.ForeignKey(Data, on_delete=models.PROTECT)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
