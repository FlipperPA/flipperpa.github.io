---
title: "Programmatically Modifying a Wagtail StreamField"
layout: post
date: 2022-08-30 11:38:00
tags: ["Python", "Django", "How-To"]
description: "StreamFields are one of the most powerful features of Wagtail, allowing content creators to use various blocks to assemble content. There may be times a developer wants to modify them programmatically; here's a formula to do so."
---

Modifying a `StreamField` programmatically requires a formula of several steps:

1. First, we load the specific Wagtail page instance we want to modify;
2. Then, we load a Python structure (a list of dictionaries) representing the `StreamField` contents;
3. Next, we modify the structure to add, change, or remove the `StreamField` elements programmatically;
4. Finally, we save the changes as a new revision.

Let's assume we have the following `Page` model made up of a `StreamField`:

```python
# my_app/models.py
from wagtail.core.blocks import RichTextBlock, TextBlock
from wagtail.core.fields import StreamField
from wagtail.core.models import Page
from wagtail.documents.blocks import DocumentChooserBlock, StreamBlock
from wagtail.embeds.blocks import EmbedBlock


class ContentStreamBlock(StreamBlock):
    heading = TextBlock()
    paragraph = RichTextField(features=['h2', 'h3', 'bold', 'italic', 'link'])
    document = DocumentChooserBlock()
    embed = EmbedBlock()


class MyPage(Page):
    body = StreamField(ContentStreamBlock())

    content_panels = Page.content_panels + [StreamFieldPanel('body')]
```

Here's an example of how we could loop through the instances of `MyPage`, programmatically removing any `embed` we encounter.

```python
from json import dumps

from django.utils import timezone

from wagtail.core.fields import StreamField

from my_app.models import ContentStreamBlock, MyPage


for my_page in MyPage.objects.all():
    # Create a blank list for the revised StreamField
    new_streamfield_struct = []

    # Grab the existing StreamField as a list of dicts
    streamfield_struct = my_page.specific.body.get_prep_value()

    # Loop through the StreamField elements, drop any embeds
    for index, element in enumerate(streamfield_struct):
        if element["type"] != "embed":
            new_streamfield_struct.append(element)

    # Convert the new_streamfield_struct back to a StreamField and save a new revision
    my_page.body = StreamField(
        ContentStreamBlock()).to_python(dumps(new_streamfield_struct)
    )
    revision = my_page.save_revision(submitted_for_moderation=False)
    revision.publish()
    my_page.live_revision = revision
    my_page.live_revision_id = revision.id
    my_page.last_revision_created_at = timezone.now()
    my_page.save()
    print(f"Saved new page with page_id {my_page.id}.")
```

That's the formula! You can do whatever you like in the part of the code where I've dropped `embed` elements as an example, just make sure to carefully verify and validate your `StreamField` structure. It is worth examining your structure in detail so you understand how it is stored as `JSON` in the database, and how to manipulate it as a Python structure.
