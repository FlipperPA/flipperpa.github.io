---
title: "Feeding My Inner Database Love at PGConf Philly 2018"
layout: post
date: 2018-08-03 19:13:00
tags: ["Database", "Conferences & Meetups"]
description: "We were lucky enough to host PGConf Philly 2018, the third year we've hosted the conference for PostgreSQL at The Wharton School. The event brought PostgreSQL enthusiasts from the east coast together for an afternoon of learning, sharing, and fun. Jim Mlodgenski started the event showing some trends in PostgreSQL growth; Philadelphia is the third largest local PG group, behind only New York and San Francisco. Yes, we're bigger than Chicago, Seattle, and Austin!"
---

## Bruce Momjian - Will Postgres Live Forever?

In this talk, Bruce talked about the long life of open source software, and the life cycle differences between proprietary and open source software. As it turns out, "forever" is a difficult term; the Universe is 13.7 billion years old (give or take). Bruce pointed out that proprietary software follows a predictable, unfortunate cycle:

- Innovation
- Market growth
- Market saturation
- Maximize profit, minimize costs (development, support)
- End-of-life

[Hopefully, this isn't what is happening with Duo.](https://arstechnica.com/information-technology/2018/08/heads-up-2fa-provider-duo-security-to-be-acquired-by-cisco-ugh/) The open source life cycle is quite different:

- Parity with proprietary software, low cost
- Market growth
- Continue innovation or decline
- Source code is always available to continue

PostgreSQL is at the point where it has reached feature parity with its closed source counterparts, and can continue to innovate with dexterity. Postgres was almost dead in 1996 when the current team joined and reinvigorated it. Proprietary software dies when it is no longer profitable; open source remains active when it serves a purposes, and it can always be resurrected if useful.

## Mike Freedman - Performant Time-Series Data Management and Analytics With Postgres

Mike dove into the difficulties databases experience with time series data. Relational databases traditionally are hard to scale with huge time series datasets. As a table grows to millions or billions of rows, it is inevitable to fall off a performance cliff when you run out of nice, fast RAM, and have to shuffle to much slower disk (even if it is SSD).

Enter [TimescaleDB](https://www.timescale.com/), a time-series database packaged as a PostgreSQL extension. It supports JOINs against existing data, and can scale to hundreds of billions of rows, and performs better than the most popular NoSQL databases available. `GROUP BY` queries see a speed gain of 20-200%. Time-ordered `GROUP BY` queries see a 400 - 10000 times increase in speed. It does this by chunking the time-series data in partitions. It manages keeping track of which data should go where, and chunks make the data processing stay in memory instead of swapping to disk. It also makes some optimizations to certain PostgreSQL functions to improve index hit ratios.

## Payal Singh - Essential Postgres Performance Tuning

Payal gave a great talk in 2017 explaining the powerful PostgreSQL permissions system, such as restricting access to segments of columns or rows, so I was excited to see she was speaking again. She shared her personal top performance tuning tips for PostgreSQL at both the Linux and PostgreSQL levels.

She discussed how to get started with pooling, whether to use PG Bouncer of PG Pool. Memory tuning with shared buffers and how to configure your Linux shared memory were addressed, as systems now have more and more RAM. Although it is recommend to keep shared\_buffers to 25% of total RAM via Google, for systems with more memory, performance gains can be see at higher levels. The pg\_buffercache extension will give a good estimate of how much shared memory is being used, so you can set your shared\_buffers setting accordinly.

I won't got into all the great tips shared for tuning, but the slides will be available online soon.
