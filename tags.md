---
title: Tags
layout: page
section: posts
permalink: /tags/
---

{% assign sorted_tags = site.tags | sort %}
<p class="tag-index">
  {% for tag in sorted_tags %}
    <a class="tag" href="#{{ tag[0] | slugify }}">{{ tag[0] }} ({{ tag[1].size }})</a>
  {% endfor %}
</p>

{% for tag in sorted_tags %}
## {{ tag[0] }}
{: id="{{ tag[0] | slugify }}"}

<ul class="archive">
  {% for post in tag[1] %}
    <li><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time> <a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
{% endfor %}
