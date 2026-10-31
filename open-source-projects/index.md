---
title: "Open Source Projects"
layout: page
section: projects
permalink: /open-source-projects/
description: "Open source projects Tim has written and maintains."
---

<ul class="card-list">
  {% for project in site.projects %}
    <li>
      <article class="card">
        <h2 class="card-title"><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
        <p class="post-meta">{% include tags.html tags=project.tags %}</p>
        <p class="card-text">{{ project.description }}</p>
      </article>
    </li>
  {% endfor %}
</ul>
