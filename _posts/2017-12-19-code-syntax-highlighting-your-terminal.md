---
title: "Code Syntax Highlighting in Your Terminal"
layout: post
date: 2017-12-19 14:50:00
tags: ["Python", "Linux"]
description: "Here's a quick trick using the Python library pygments to enable pretty colors in your terminal when viewing source code. It detects which syntax highlighter to use by the file's extension."
---

I'm a terminal command line basher (see what I did there?). While I understand the appeal of IDEs, I tend to create from the command line. I use Sublime as a lightweight text editor, but for everything else, I like to tickle the keys. I started using computers before the GUI era, and it has stuck with me. It might also have something to do with the fact I took piano lessons for many years!

{% include figure.html src="/assets/images/piano_keyboard.original.png" alt="Piano Keyboard" align="center" caption="I love the tickle the keys!" %}

One trick I waited far too long to implement was to get a good syntax highlighter at the command line. It is relatively straight forward. First, I install the Python package **pygments** system-wide with `pip`.

```bash
sudo pip install pygments
```

Next, I create an alias in my home directories `.bashrc` file. I'll add line numbers for good measure.

```bash
alias ccat='pygmentize -O style=monokai,linenos=1 -f terminal -g'
```

After doing this, I now have a colored `cat` command, or `ccat`. It can be used as follows, with pretty results.

```python
$ ccat settings.py
0001: from django.conf import settings
0002:
0003: from .models import Settings
0004:
0005:
0006: def get_setting(key, default):
0007:     """
0008:     Returns a value for key from the Settings model.
0009:     """
0010:     setting = Settings.objects.get(key=key)
0011:
0012:
0013: def get_clear_cache():
0014:     """
0015:     Default to clearing the cache after each page edit.
0016:     """
0017:
0018:     return getattr(settings, "WP_CLEAR_CACHE", False)
```

Small things like this help make me a better developer. It makes source code in the terminal very clear, and [pygments supports a vast array of languages](http://pygments.org/languages/) for highlighting.
