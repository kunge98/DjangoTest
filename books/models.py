from django.db import models

from django.db import models
from django.contrib.auth.models import User


class Book(models.Model):
    # 图书管理系统的字段
    title = models.CharField(max_length=255)
    issn = models.CharField(max_length=20, unique=True)
    publish_date = models.DateField()
    stock = models.PositiveIntegerField(default=0)
    category = models.CharField(max_length=100, default="Uncategorized")  # 新增分类字段

    def __str__(self):
        return self.title
