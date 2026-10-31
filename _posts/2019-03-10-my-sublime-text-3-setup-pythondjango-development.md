---
title: "My Sublime Text 3 Setup for Python/Django Development"
layout: post
date: 2019-03-10 16:15:00
description: "Text editors are an essential tool for every developer, and there is no right answer on which to use. It depends quite a bit on how you learned, and how your mind works. I grew up on the command line before every touching a GUI, and that has stuck with me throughout the years. This is reflected in my choice of text editors: Sublime Text 3 when in a GUI environment, and emacs for the terminal."
---

I like Sublime because it is lightweight when compared to a fully featured IDE, such as PyCharm or Visual Studio. I use the command line for searching text with grep, sed, and awk, and I've always felt git should be used at the command line to make sure you're doing what you think you're doing.

Here's the set up I use for Sublime.

- First, install package control by follow these instructions.
- Go to the **Tools -> Command Palette**.
- Type **Package Control: Install Package** and select it.
- Search for **Anaconda** and install it. Anaconda gives you a wonderful Python environment: automagically checking for unused package imports and variables, making sure you follow [PEP-8](https://www.python.org/dev/peps/pep-0008/) coding style, and common syntax problems. It will make your code much cleaner, readable, and maintainable going forward. I have never seen a syntax highlighter as good the on Anaconda provides.
- Install black on your current system with `pip install black`. Then, search for **subblack** using **Package Control: Install Package**, and install it just like you installed Anaconda. Black is an opinionated Python syntax formatted. If you have ugly code, simply hit **Control + Alt + B** to format it beautifully.
- If you'd like autocomplete for Django, you can use **Package Control: Install Package** to install **Djaneiro** as well.
- [PEP-8](https://www.python.org/dev/peps/pep-0008/), Python's style guide, recommends a maximum line length of 79 characters. I find this too short for modern coding, and prefer Black's default. Go to **Preferences > Package Settings > Anaconda > Settings-Syntax Specific-User**. A new tab will open in your editor. We also want to explicitly set the path to the correct Python version, especially on Windows, as installing NodeJS may (still, in December 2019, ugh) install Python 2.7. This block also tells Sublime to ignore certain linter warnings to be Black and PEP-8 compatible. Enter the following, save the file, and restart Sublime Text.

```javascript
{
    "pep8_max_line_length": 88,
    "rulers": [88],
    "pep8_ignore": ["E203", "E231", "E309", "E501", "W503"],
    "python_interpreter": "C:/Users/tallen/AppData/Local/Programs/Python/Python37/python.exe"
}
```

By default Sublime Text writes a Tab when the tab key is pressed. [PEP-8](http://legacy.python.org/dev/peps/pep-0008/) recommends four spaces instead of a Tab. To change this, in the menu bar go to **Preferences > Settings-User**. You may have some defaults already in place; you want to add `"translate_tabs_to_spaces": true,` so it looks something like this:

```javascript
{
    "translate_tabs_to_spaces": true,
    "ignored_packages":
    [
        "Vintage"
    ]
}
```

- Last but not least, if you're working with modern version of JavaScript for front-end libraries like ReactJS or VueJS, you'll want to install a better JavaScript syntax highlighter. I use **Babel Snippets**. Find it an install it with **Package Control: Install Package**, just like you did for Anaconda, Djaneiro and sublack**.** You will want to make it the default syntax for JavaScript extensions. To do this:
  - Open a file with that extension (such a `.js` or `.jsx`)
  - Select **View -> Syntax -> Open all with current extension as... -> Babel -> JavaScript (Babel)**
  - Repeat this for any other JavaScript extensions you may use.

It is a fair amount of setup up-front, but definitely worth it to me, as the code I produce on a regular basis is so much better than without this setup. Good luck and have fun coding!
