---
title: "Know Thy User: Custom User Models With django-allauth"
layout: post
date: 2020-10-16 20:54:00
tags: ["Python", "Django", "How-To"]
description: "ALWAYS use a custom Django user model when starting a project. This is one of the best up-front investments of time that I know of in creating Django projects. Every time I haven't taken the time to do this the right way up front, I have regretted it. Every. Time."
---

## Background

Let's face it: **managing users is likely the most important core aspect of any web project**. It isn't easy, and one size does not fit all. It might be tempting to overlook this architecture, or kick the can down the road, but it is one element where I have seen many projects pay the price for not planning up front.

Just over the past few weeks, [I've had conversations with several friends](https://twitter.com/pystar/status/1317159069929607168) who considered using Django's out-of-the-box `django.contrib.auth` User model. This should be avoided, [and it even says so in Django's documentation](https://docs.djangoproject.com/en/3.1/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project). So how do you do it right? While there is no singular perfect solution, there is a flexible way of getting started, which I will outline here.

I'm a big fan of the `django-allauth` package, and recommend using it in conjunction with a custom Django users model. If you want a fuller understanding of Django custom user model options, [please see this excellent article](https://testdriven.io/blog/django-custom-user-model/).

## Our Example users App

For this example, let's assume we are doing the more complex task outlined in the article above.

- We create an app called `users` with a model called `User`
- User subclasses `AbstractBaseUser`, using the `email` field as the username
- Users may login with a local email and password combination, or by using Facebook, Twitter, or Google's third party authorization options.

Here's an example of how our `users/models.py` might look like.

```python
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Users must have an email address.")

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email,password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='email address',
        unique=True,
        db_index=True,
    )
    full_name = models.CharField(
        max_length=191,
        blank=True,
    )
    short_name = models.CharField(
        max_length=191,
        blank=True,
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"

    def get_full_name(self):
        return self.full_name

    def get_short_name(self):
        return self.short_name

    def __str__(self):
        return f"{self.email} ({self.full_name})"
```

## Modifying Our Settings

First, we need to wire up `django-allauth` to our Django project.

```python
AUTH_APPS = [
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.facebook",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.twitter",
]

SITE_ID = 1

INSTALLED_APPS += AUTH_APPS

AUTH_USER_MODEL = "users.User"

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]
```

Then we have to tell `django-allauth` how we've set up our custom user model. These settings allow us to use the `email` field as in lieu of the username, and use the `email` received from the third party auth systems as such.

```python
# Settings for email as username
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
```

This has the added advantage of avoiding users creating duplicate accounts. If someone tries to create an account with Twitter, but they already have an account with us with the email address that Twitter provides, they will receive a message reminding them they already have an account. They can then login to the website, and associate their Twitter account with their existing account, if they wish.

Here are some other settings I find useful from `django-allauth`:

```python
# Email confirmation
ACCOUNT_EMAIL_SUBJECT_PREFIX = "[My Website]"
ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION = True

# After 10 failed login attempts, restrict logins for 30 minutes
ACCOUNT_LOGIN_ATTEMPTS_LIMIT = 10
ACCOUNT_LOGIN_ATTEMPTS_TIMEOUT = 1800
ACCOUNT_PASSWORD_MIN_LENGTH = 12

# Other settings
ACCOUNT_DEFAULT_HTTP_PROTOCOL = "https"
ACCOUNT_LOGIN_ON_PASSWORD_RESET = True
SOCIALACCOUNT_AUTO_SIGNUP = False
```

[There are many `django-allauth` settings which can be reviewed to tailor your user experience](https://django-allauth.readthedocs.io/en/latest/configuration.html). I recommend reviewing them.

I haven't gone into the details of how to set up the third-party providers. There is [an excellent tutorial on adding Facebook](http://www.sarahhagstrom.com/2013/09/the-missing-django-allauth-tutorial/#Create_and_configure_a_Facebook_app), and the process is similar for all third party providers.

I hope this walk-through helps get folks off on the right foot. This stuff isn't easy, but it is very important to get right, at the beginning of a project. I've found these settings over many years with several different projects, and hope that experience saves some time for others. Good luck!
