---
title: "Django S3 SQLite: New Release with Major Improvements"
layout: post
date: 2020-02-02 13:08:00
tags: ["Python", "Django"]
description: "The new release contains a bug fix, some new logging features, and a major performance boost."
---

I've released a new version of django-s3-sqlite, a package which allows you to use SQLite hosted on S3 as your Django database. This is orders of magnitude cheaper than RDS, but comes with risks.

Thanks to Peter Baumgartner of Lincoln Loop, we've got a fairly significant release:

- Introduces more and better logging.
- Fixes a bug with DB hash comparison and ensures only a single load of the DB to memory, which provides a nice performance boost: [#2 (comment)](https://github.com/FlipperPA/django-s3-sqlite/pull/2#issuecomment-578328800)

Check it out when you get a chance: <https://pypi.org/project/django-s3-sqlite/>
