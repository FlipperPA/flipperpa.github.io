---
title: "Generating a PDF from Markdown or HTML"
layout: post
date: 2015-06-30 16:50:00
tags: ["Python", "How-To"]
description: "There are many different methods of generating a PDF in Python (and therefore, Django), that I have been exploring over the past few days for a project. After looking through these, this one seems straightforward."
---

There are many different methods of generating a PDF in Python (and therefore, Django), that I have been exploring over the past few days for a project. After looking through these, this one seems straightforward. First, install the base requirement of wkhtmltopdf. On Ubuntu:

```bash
apt-get install wkhtmltopdf
```

On Windows, OS/X, and other Linux distributions, such as FreeBSD, RedHat, Federa, or CentOS, you may have to find a binary to install. You can [download them here](http://wkhtmltopdf.org/downloads.html).

For an example, on CentOS, after downloading, I had to install the RPM:

```bash
yum install wkhtmltox-0.12.2.1_linux-centos6-amd64.rpm
```

Then on to the Python layer. Using **pip**, install the **pdfkit** and markdown packages:

```bash
pip install pdfkit markdown
```

Here's some example code to take a Markdown source file and write a PDF file. If your source is HTML, you can skip the step converting the source Markdown.

```python
from markdown import markdown
import pdfkit

input_filename = 'README.md'
output_filename = 'README.pdf'

with open(input_filename, 'r') as f:
    html_text = markdown(f.read(), output_format='html4')

pdfkit.from_string(html_text, output_filename)
```

Want to add some custom margins?

```python
from markdown import markdown
import pdfkit

input_filename = 'README.md'
output_filename = 'README.pdf'

with open(input_filename, 'r') as f:
    html_text = markdown(f.read(), output_format='html4')

options = {
    'page-size': 'Letter',
    'margin-top': '0.25in',
    'margin-right': '0.25in',
    'margin-bottom': '0.25in',
    'margin-left': '0.25in',
    'encoding': "UTF-8",
    'no-outline': None
}

pdfkit.from_string(html_text, output_filename, options=options)
```

Finally, want to change some options to make text smaller, so it fits more reasonably on a printed page? Create a custom stylesheet, and apply it. Here's the CSS file I created, called **style.css**:

```css
html {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  -webkit-text-size-adjust:100%;
  -ms-text-size-adjust:100%
}

body {
  margin:0;
}

h1, .h1 {
  font-size: 24px;
}

h2, .h2 {
  font-size: 18px;
}

h3, .h3 {
  font-size: 14px;
}

h4, .h4 {
  font-size: 12px;
}

h5, .h5 {
  font-size: 11px;
}

h6, .h6 {
  font-size: 9px;
}
```

Then, include the file as an option:

```python
from markdown import markdown
import pdfkit

input_filename = 'README.md'
output_filename = 'README.pdf'

with open(input_filename, 'r') as f:
    html_text = markdown(f.read(), output_format='html4')

options = {
    'page-size': 'Letter',
    'margin-top': '0.25in',
    'margin-right': '0.25in',
    'margin-bottom': '0.25in',
    'margin-left': '0.25in',
    'encoding': "UTF-8",
    'no-outline': None
}

css = 'style.css'

pdfkit.from_string(html_text, output_filename, options=options, css=css)
```

Fairly straightforward, thanks to the libraries available, and flexible. Beautiful is better than ugly!
