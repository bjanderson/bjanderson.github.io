---
title: Development Environment Setup
date: 2025-10-04
description:
draft: false
tags:
aliases:
cssclasses:
---

I use [Linux Mint](https://linuxmint.com/) as my daily OS at home. I use Windows as my daily OS at work. And I use both for web development. I don't own a Mac, so I can't say for sure that this guide will work for those, but it shouldn't be too far off if at all.

Whatever operating system you use, I trust that you know your way around it well enough that I don't have to tell you how to install and configure software. With that in mind, I'll give you a high-level rundown of how I have my development environment setup.

For all practical purposes, it's probably easier if you install Node, Git, and VS Code first, and then use your Bash (Git Bash) terminal to find your config files, and VS Code to edit them.

You can easily find the config files listed below by opening a bash terminal and typing:

`cd
ls -al`

and look for the files (.bashrc, .gitconfig, .npmrc).

If VS Code is installed, you should be able to open each file with the `code` command.

`code ~/.bashrc`

`code ~/.gitconfig`

`code ~/.npmrc`

## [Nodejs](https://nodejs.org/en/)

There are many [download](https://nodejs.org/en/download) options for NodeJS.

If you're using Linux you will need to choose the link to [Install via Package Manager](https://nodejs.org/en/download/package-manager).

If you're running a Debian or Ubuntu based distro, then you can find the install instructions here: https://github.com/nodesource/distributions

### .npmrc

If you have authTokens for npm or github or anywhere else, you can add them here too.
Any proxy configs you might have to use would also go in here.

![[npmrc]]

## [Git](https://git-scm.com/)

Downloading and installing git is pretty straight forward. Grab the installer you need from the [downloads](https://git-scm.com/downloads) page and follow the prompts when you run it.

Make sure to install Bash if given the option.

### .gitconfig

You will want to add your email and name so that you don't get prompted every time you commit.

Add the core.editor = code setting to use VS Code as your editor whenever git prompts you for input on anything.

I added some aliases as an example. You would type `git adog` to show the oneline graph log.

And you can change the name of your default branch if you don't want it to be "master."

![[gitconfig]]

## [Bash](https://www.gnu.org/software/bash/)

If you're running Linux or Mac, then you probably already have bash (or something like it - zsh) installed.
If you're on Windows, then you will have installed Bash when you installed Git For Windows.

If you have zsh or csh or something else, then you will need to edit your .zshrc, or whatever respective rc file your terminal uses.

Here I'm showing you how to export tab-completeable shortcuts that you can use instead of having to type out the full path every time you cd to a folder, or run a command.

I make full use of the aliases so that I don't have to type out repetitive commands, and some of them I don't use often enough to memorize them so I just type something and hit tab a couple times to see what my options are, which is a quick way to get a reminder of things I've aliased.

### .bashrc

![[bashrc]]

## [Visual Studio Code](https://code.visualstudio.com/)

The installer for VS Code is pretty straight forward too. Just grab the installer from the home page and follow the prompts when you run it. Make sure to select the option to include code in your PATH and to allow it to open files and folders from the right-click menu.

### Extensions

![[VS Code Extensions]]

### Settings

![[VS Code Settings]]

### Keybindings

![[VS Code Keybindings]]

### Snippets

#### css

![[VS Code CSS Snippets]]

#### scss

![[VS Code SCSS Snippets]]

#### html

![[VS Code HTML Snippets]]

#### javascript

![[VS Code JavaScript Snippets]]

#### typescript

![[VS Code TypeScript Snippets]]
