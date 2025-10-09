---
title: Create a New Github Repo
date: 2025-09-30
description:
draft: false
tags:
aliases:
cssclasses:
---

If you're going to commit your code to github, or some other git repo, you should set that up first.

I go to my Github account, and create a new repo (plus [+] button in top-right corner), and name it whatever you named your project when you created it. I usually make my projects private to start with, and make them public later on if it's worth making them known to the world. I also don't generate any readme, or license, etc... Just a blank project.

And then follow the instructions for configuring your project to be linked to your Github repo. The instructions should appear immediately after you create the repo on Github.

Make your first commit, and then create a new branch to do your development on.

To start I just have the main/master branch, and I create a branch named "edits" to do all my work on.

If you copied my bashrc config from the [[Development Environment Setup]] article, you will have some alias commands to do this for you.

```bash
gcbedits
```

These alias commands are tab complete-able, so you can type `gcbe` and then TAB, and it should complete the rest for you.
