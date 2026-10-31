---
title: "My Latest VSCode Setup"
layout: post
date: 2020-08-01 15:48:00
tags: ["Python", "Django", "How-To"]
description: "My development environment is always evolving. Here's my latest/greatest setup."
---

## Video on My Path to VSCode

I've used a lot of editors over the years. Here's a presentation for co-workers on how I ended up a VSCode enthusiast. If you'd like to learn why I love VSCode so much, check this out.

{% include youtube.html id="A6W187xNw1c" %}

## Current Extensions

- Remote Development (ms-vscode-remote.vscode-remote-extensionpack): <https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack>
- GitLens (eamodio.gitlens): [https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- GitHistory (donjayamanne.githistory): [https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- Python (ms-python.python): [https://marketplace.visualstudio.com/items?itemName=ms-python.python](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- Django Templates (batisteo.vscode-django): <https://marketplace.visualstudio.com/items?itemName=batisteo.vscode-django>
- Beautify (hookyqr.beautify): <https://marketplace.visualstudio.com/items?hookyqr.beautify>
- ESLint (dbaeumer.vscode-eslint): <https://marketplace.visualstudio.com/items?dbaeumer.vscode-eslint>

## An Example ".vscode/settings.json"

```json
{
    "[python]": {
        "editor.rulers": [
            88
        ],
        "editor.formatOnSave": false,
    },
    "python.pythonPath": "/home/username/.venvs/your-venv/bin/python3",
    "python.formatting.provider": "black",
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": false,
    "python.linting.flake8Enabled": true,
    "python.linting.flake8Args": [
        "--ignore=E203,E231,E309,E501,W503",
        "--max-line-length=88",
        "--verbose"
    ],
    "editor.wordWrapColumn": 88,
    "files.associations": {
        "**/*.html": "html",
        "**/templates/**/*.html": "django-html",
        "**/templates/**/*": "django-txt",
        "**/requirements{/**,*}.{txt,in}": "pip-requirements"
    },
}
```

## An Example ".vscode/launch.json"

You can find details about [**creating a debugger launch profile here**](https://code.visualstudio.com/docs/python/tutorial-django#_create-a-debugger-launch-profile); below is an example of the one I use.

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Django",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/manage.py",
            "args": [
                "runserver",
                "0:8000",
            ],
            "django": true
        }
    ]
}
```

## Fin.

I hope this helps get you off any running with VSCode for your Python and Django development!
