---
title: VS Code HTML Snippets
date: 2025-10-01
description:
draft: false
tags:
aliases:
cssclasses:
---

```json

  "ahref": {
    "prefix": "ahref",
    "description": "a:href target blank",
    "body": [
      "<a href=\"$1\" target=\"_blank\"  rel=\"noopener noreferrer\">$2</a>"
    ]
  },

  {
	"href target blank": {
		"prefix": "target=",
		"body": [
			"target=\"_blank\"  rel=\"noopener noreferrer\""
		],
		"description": "href target blank"
	},

    "mat-icon": {
      "prefix": "mat-icon",
      "body": [
        "<mat-icon class=\"icon\" aria-hidden=\"true\" fontSet=\"fas\" fontIcon=\"fa-$0\"></mat-icon>"
      ],
      "description": "mat-icon"
    },

	"language-bash": {
		"prefix": "language-bash",
		"body": [
			"<code class=\"language-bash\">$0</code>"
		],
		"description": "language-bash"
	},

	"language-javascript": {
		"prefix": "language-javascript",
		"body": [
			"<code class=\"language-javascript\">$0</code>"
		],
		"description": "language-javascript"
	},

	"language-text": {
		"prefix": "language-text",
		"body": [
			"<code class=\"language-text\">$0</code>"
		],
		"description": "language-text"
	}
}

```
