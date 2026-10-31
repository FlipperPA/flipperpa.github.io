---
title: "Responsive Embeds with Wagtail and Bootstrap 4"
layout: post
date: 2018-01-05 02:54:00
tags: ["Python", "Django", "How-To"]
description: "Bootstrap 4 provides some wonderful classes to use with various types of embedded content. In this post, I'll show how to use Wagtail's embed package to choose which Bootstrap CSS class to use in Django templates."
---

Wagtail's embed package allows content authors to insert videos, tweets, and various other embedded content by just inserting a URL. With Bootstrap 4, we can make these fairly smart. Wagtail provides a ratio for some types of embedded content. Have a look at how we can analyze the ratio to use different responsive Bootstrap 4 ratios in this Django template, which I use to override the template provided by Wagtail's embed package:

{% raw %}
```python
{% load wagtailembeds_tags %}

{% if embed.ratio %}
    {# If an aspect ratio is included, use the appropriate Bootstrap 4 class #}
    {% if embed.ratio > 0.9 %}
        <div class="embed-responsive embed-responsive-1by1">
    {% elif embed.ratio > 0.7 %}
        <div class="embed-responsive embed-responsive-4by3">
    {% elif embed.ratio > 0.5 %}
        <div class="embed-responsive embed-responsive-16by9">
    {% else %}
        <div class="embed-responsive embed-responsive-21by9">
    {% endif %}
{% else %}
    {# Otherwise, center it in a row, for things like Tweets. #}
    <div class="row justify-content-center">
{% endif %}

{# Embed the content with an absurdly high max width. #}
{% embed embed.url max_width=3840 %}
</div>
```
{% endraw %}

What this does is look to see if Wagtail passes us a ratio for the embedded content, which it should for content with an aspect ratio, such as video. It will then choose the appropriate Bootstrap 4 class for that ratio - as best as it can, from four possible aspect ratios provided by Bootstrap 4.

If no ratio is available, it creates a center row, with the embed creating the height. Thanks to Bootstrap 4, this will also scale properly on small screens. You can see this in action [with a video on this post](/interview-about-philly-women-tech-summit-y-chromosome-perspective/).
