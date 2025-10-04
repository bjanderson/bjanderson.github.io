---
title: .gitconfig
date: 2025-10-04
description:
draft: false
tags:
aliases:
cssclasses:
---

~/.gitconfig

```ini
[user]
  email = your@email.com
  name = Your Name
[push]
  default = simple
  followTags = true
[core]
  editor = code
[pull]
  rebase = false
[alias]
  adog = log --all --decorate --oneline --graph
  logn = log  --abbrev-commit --all --decorate --graph --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)'
[init]
  defaultBranch = master
```
