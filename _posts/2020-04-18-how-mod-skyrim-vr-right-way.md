---
title: "How to Mod Skyrim VR \"the Right Way\""
layout: post
date: 2020-04-18 12:42:00
tags: ["How-To", "Virtual Reality"]
description: "Skyrim is one of the most popular games ever released, with an extremely loyal following. It has evolved into a platform over the years, with a huge ecosystems of plugins written by the loyal fan base which can add an amazing variety of content and updates that modernize the look and feel."
hero: /assets/images/skyrim-hd-screenshot.original.jpg
---

## Background

I had never played Skyrim before Skyrim VR, so I had no idea what a huge amount of user generated content was available. I consider myself lucky that this was the first way I experienced Skyrim - with full immersion. There are amazing mods available from the community which modernize the textures, add immersive content like flora and birds, and a lot of extra content. This only works with the PC version of Skyrim VR. The difference made in immersion by improving something that seems trivial like the covers of the books found throughout the game is quite striking, and a testament to the power of VR.

## Step One: Use Mod Organizer 2!

I used Nexus Mod Manager (**NMM**) for my first dive into modding, and while it worked, NMM modifies the source game files which can lead to corrupting the core game. The only way out of this is to start from scratch, potentially losing all of your saved content and characters. Mod Organizer 2 (**MO2**) solves this issue by allowing you to create *profiles*: each profile is an individual environment where you can install different sets of mods. For my Python friends, think of it as a `venv` for mods! While this ends up taking more space on your hard drive, it is worth it, as some mods are more stable than others. MO2 also integrates with *Loot*, a program which automatically figures out the proper load order for your mods, lists any known issues that may occur with mod compatibility, and suggestions on how to fix those issues.

You'll need to create an account at Nexus Mods. After logging in, you can download MO2 here:

<https://www.nexusmods.com/skyrimspecialedition/mods/6194?tab=files>

## Step Two: Directory Structure and Installing MO2

You can download the installer, or the archive version. I prefer creating a subdirectory under my Steam Library for MO2. Since I save my Steam downloads to my `D:\` drive, this is my directory layout:

```bash
D:\SteamLibrary\steamapps
D:\SteamLibrary\MO2
D:\SteamLibrary\SkyrimMods
```

`steamapps` will be created by Steam to save your downloaded games. After installing MO2 in the `MO2` directory, I configure MO2 to use `SkyrimMods` as its `Base Directory` for Skyrim. This is done by going to `Tools` -> `Settings` -> `Paths`, and entering `D:/SteamLibrary/SkyrimMods` into the `Base Directory` field. You will also need to login to your Nexus Mods account under the `Nexus` tab. After logging in, you can close out `Settings`.

MO2 has an excellent tutorial walking your through the configuration and installation process.

## Step Three: Installing A Single Mod and Running Skyrim VR

The first patch to install should always be the Unofficial Skyrim Special Edition Patch, which is a community collection of bug fixes. You can download it here using Nexus Mod Manager.

- Visit the mod's page: https://www.nexusmods.com/skyrimspecialedition/mods/266
- Click over to the `FILES` tab: https://www.nexusmods.com/skyrimspecialedition/mods/266?tab=files
- Click the `Mod Manager Download` button.
- In MO2, you should be able to see the download complete under the `DOWNLOADS` tab in the right hand pane of the program.
- Then, check the checkbox next to the downloaded mod in the left hand pane.
- After installing and new download, click the `PLUGINS` tab on the right, and click `SORT`. Do this any time you've downloaded a new mod.

## Step Four: How to Start Skyrim VR

This is the trickiest part to getting Skyrim VR running on my Valve Index, to allow the controllers to work properly.

- In MO2, click the `SHORTCUT` button and select `DESKTOP`. I rename my shortcut to be `Skyrim MO2 VR`.
- Copy the shortcut from your `DESKTOP` to your `MO2` folder (in my case, `D:\SteamLibrary\MO2`)
- Start Steam, and go to the `LIBRARY` tab
- At the bottom left of the screen click `ADD A GAME`, then select `ADD A NON-STEAM GAME`
- Click `BROWSE`, and select the shortcut you just copied to `D:\SteamLibrary\MO2`
- Start Steam VR. Find the game you added and start it - it can be tricky to find.
- MO2 will start in the background. From the Steam VR interface, select the option to `VIEW DESKTOP`, then from MO2, click the big `RUN` button.
- **This will start Skyrim from MO2 with your Valve Index controllers activated properly.**
- Once it starts, Skyrim will appear in the "Active Game" slot; click it, and you're good to go!
- This may seem like a lot, but becomes second nature after doing it two or three times.

## Enough with the TechSpeak! What Mods Should I Get?

This is a great list of what mods to get for the Valve Index for total immersion:

<https://venturebeat.com/2018/04/08/40-must-have-mods-for-the-elder-scrolls-v-skyrim-vr/>

When it comes to more content, these fan created mods add hundreds of hours, and work with Skyrim VR:

- Falskaar
- Bruma
- Clockwork
- Forgotten City
- Project AHO
- Vigilant (Be sure to download English language as well!)

If anyone has ideas for improvements or suggestions to make this process a bit less tedious, I'm all early! [You can find me on Twitter](https://twitter.com/FlipperPA/).
