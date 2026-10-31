---
title: "Peregrine: A Blog System for Wagtail"
layout: project
tags: ["Python", "Django"]
description: "If you know a little bit about Django, it should be relatively straightforward to get started with Peregrine with this five-minute install. If you are new to Django, check out the excellent tutorial."
---

## Create a Fresh Django Project

```bash
mkvirtualenv my_blog
pip install peregrine
django-admin startproject my_blog
cd my_blog
```

## Modify Your Django Settings

Your settings file will be located in my\_blog/settings.py if you're using the default Django project layout created by the startproject command above. You can add these settings at the very bottom of the file.

```python
PEREGRINE_APPS = [
    'wagtail.wagtailcore',
    'wagtail.wagtailadmin',
    'wagtail.wagtaildocs',
    'wagtail.wagtailsnippets',
    'wagtail.wagtailusers',
    'wagtail.wagtailimages',
    'wagtail.wagtailembeds',
    'wagtail.wagtailsearch',
    'wagtail.wagtailsites',
    'wagtail.wagtailredirects',
    'wagtail.wagtailforms',
    'wagtail.contrib.table_block',

    'bootstrap4',
    'wagtailcodeblock',
    'wagtailcontentstream',
    'peregrine',
    'taggit',
    'modelcluster',
]

INSTALLED_APPS += PEREGRINE_APPS

PEREGRINE_MIDDLEWARE = [
    'wagtail.wagtailcore.middleware.SiteMiddleware',
    'wagtail.wagtailredirects.middleware.RedirectMiddleware',
]

MIDDLEWARE += PEREGRINE_MIDDLEWARE

WAGTAIL_SITE_NAME = 'My Blog'
```

## Setting Up URLs

Your URL route file will be located in my\_blog/urls.py if you're using the default Django project layout created by the startproject command above. You can replace the entire file with this:

```python
from django.conf.urls import url, include
from django.contrib import admin

from wagtail.wagtailcore import urls as wagtail_urls
from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtaildocs import urls as wagtaildocs_urls

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    # Peregrine URLs for Wagtail
    url(r'^documents/', include(wagtaildocs_urls)),
    url(r'^cms/', include(wagtailadmin_urls)),
    url(r'', include(wagtail_urls)),
]
```

## Fire it up!

After you've set up your settings, we need to create your database and a superuser. Issue the following commands from your project root directory.

*Only run the command peregrine\_initial\_site if you are running on a new project, as it loads database fixtures!*

```bash
python manage.py migrate
python manage.py peregrine_initial_site
python manage.py createsuperuser
python manage.py runserver 0:8000
```

You should then be able to navigate to <http://localhost:8000/cms/> and log in, and start creating!
