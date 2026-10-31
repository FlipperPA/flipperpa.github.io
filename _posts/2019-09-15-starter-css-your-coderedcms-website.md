---
title: "Starter CSS for Your CodeRedCMS Website"
layout: post
date: 2019-09-15 18:30:00
tags: ["Python", "Django", "How-To"]
description: "CodeRedCMS is a fantastic starting point to create a website for those are familiar with WordPress, but prefer the straightforward interface of Wagtail. Here's some CSS to help you get started."
---

CodeRedCMS integrates Bootstrap 4 and Wagtail, giving a wonderful toolkit for starting a website. Out of the box, however, it needs a little bit of CSS.

This code snippet below is a good starting point to take care of headers, add hover backgrounds to navigation, and an example of how to change the size of the site logo. You can start by putting this CSS in `website/static/css/custom.css` in your CodeRedCMS Django project.

```css
body {
    font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #000000;
    margin-top: 100px;
}

h1, h2, h3, h4, h5 {
    text-transform: none;
}

.navbar-brand img {
    height: 75px;
}

.nav-link:hover {
    background: #9EDFEC;
}

.hero-bg {
    height: 500px;
}

.hero-fg {
    position: relative;
    top: 300px;
    color: white;
    height: 100%;
    width: 100%;    
}

.hero-fg .container .row {
    position: relative;
}

.hero-fg h1 {
    color: #ffffff;
    font-size: 3rem;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    display: table;
}

.hero-fg h2 {
    color: #ffffff;
    font-size: 3rem;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    display: table;
}

@media screen and (max-width: 800px) {
  .hero-bg {
    height: 250px;
  }
  .hero-fg {
    top: 150px;
  }
  .hero-fg h1 {
    font-size: 1.5rem;
    padding: 3px;
  }
  .hero-fg h2 {
    font-size: 1.5rem;
    padding: 3px;
  }
}

@media screen and (min-width: 801px) {
  .col-form-label {
    text-align: right;
  }
}
```

The CSS also adds white text and a 50% transparent black background on hero image backgrounds, making the text you choose more readable. It also aligns form labels to the right, and a few other goodies. I hope this provides a good starting point for you with CodeRedCMS!
