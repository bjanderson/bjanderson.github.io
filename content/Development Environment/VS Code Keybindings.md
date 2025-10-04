---
title: VS Code Keybindings
date: 2025-10-04
description:
draft: false
tags:
aliases:
cssclasses:
---

```json
[
  {
    "key": "ctrl+shift+s",
    "command": "workbench.action.files.saveAll"
  },

  {
    "key": "ctrl+up",
    "command": "editor.action.insertCursorAbove",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+shift+up",
    "command": "-editor.action.insertCursorAbove",
    "when": "editorTextFocus"
  },

  {
    "key": "ctrl+down",
    "command": "editor.action.insertCursorBelow",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+shift+down",
    "command": "-editor.action.insertCursorBelow",
    "when": "editorTextFocus"
  },

  {
    "key": "ctrl+shift+/",
    "command": "editor.action.blockComment",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "ctrl+shift+a",
    "command": "-editor.action.blockComment",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "alt+q",
    "command": "sqlite.runSelectedQuery"
  }
]
```
