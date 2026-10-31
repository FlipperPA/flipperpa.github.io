---
title: "Hyphens vs Underscores in Django"
layout: post
date: 2020-04-06 23:06:00
tags: ["Python", "Django", "How-To"]
description: "If I had been king of the world - or BDFL at least - I would have made hyphens available in variable and package names in Python 3. It would have been a big change, but would have gotten rid of a very confusing ambiguity: when to use hyphens, and when to use underscores. A developer on our team asked me this today, and I promised them a blog post with where and when I use each. Some of this is personal preference, but it has felt logical to me."
---

## My Background Using Different Cases

I've long been a fan of `snake_case`, using all lowercase letters with underscores. As someone who's spent a lot of time in a lot of different databases, this seems to be the one way that all databases can agree on naming objects without needing special treatment:

- PostgreSQL requires `"CapsToBeQuoted"`
- SQL Server requires `[hyphens-inside-brackets]`
- MySQL requires lots of things `` `inside-backticks` ``

`camelCase` always seemed harder to read for me, with `PascalCase` just a touch better. But it largely comes down to preferences; `camelCase` and `PascalCase` are a few characters shorter, for example.

## Python Prefers Underscores

Python packages and modules can not use hyphens, only underscores. This section of PEP-8 gives us guidance:

*Package and Module Names: Modules should have short, all-lowercase names. Underscores can be used in the module name if it improves readability. Python packages should also have short, all-lowercase names, although the use of underscores is discouraged.*

This creates some confusion for newcomers. Consider the following instructions we regularly give:

First, run `pip install django-mypackage`, then add `my_package` to `INSTALLED_APPS`.

Where’s the consistency in that? We also instruct new Djangonauts to do this:

`python manage.py startapp my_package`... and then to add `app_name = "my-package"` into `my_package/urls.py`.

Why do we do this? ***Readability counts!*** It turns out, learning where and when to use underscores and hyphens has a good rationale behind it.

## Hyphens Are Word Boundaries on the Web

It comes down to readability. An underscore should never be part of a URL. This means the following should have hyphens instead of underscores:

- git repository names
- Python packages, specifically those in PyPI (the main repository for `pip`)
- Django strings for identifiers, especially those which become URLs

Because of this, in `urlpatterns`, use hyphens for the strings, and underscores for the package path:

```python
urlpatterns = [
    path("my-project/", include("my_project.urls"),
    path("my-home/" HomeView.as_view(), name="my-home"),
]
```

{% raw %}
In a `urls.py` file, we want to be sure that our `app_name` has underscores:

`app_name = "my-project"`

Then in templates, when we call URLs, we can properly route them by app:

`<a href="{% url "my-project:my-page" %}">My Page</a>`

The exception to this is within the query string (after the `?` in a URL). Since these are variables, it is acceptable to have underscores in variables, such as `?my_variable=my_value&greeting=Hello`.

It is important for Search Engine Optimization that we use hyphens in the route and name, because search engines improve our search rank when hyphens denote word boundaries. Underscores do NOT denote word boundaries for search engine. For more on this, [you can read much more here with a detailed explanation](https://magenticians.com/dash-or-underscore-preferred-in-urls/).

I hope this gives a run down on the best practices of when to use hyphens and underscores, and don’t be discouraged. I still get them wrong a lot of the time too!
{% endraw %}
