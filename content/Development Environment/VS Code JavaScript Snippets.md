---
title: VS Code JavaScript Snippets
date: 2025-10-01
description:
draft: false
tags:
aliases:
cssclasses:
---

```json
{
  "Print to console": {
    "prefix": "llog",
    "body": ["console.log('$0');"],
    "description": "Log output to console"
  },

  "Print vlaue to console": {
    "prefix": "ccl",
    "body": ["console.log('$0: ', $0);"],
    "description": "Log value to console"
  },

  "noop": {
    "prefix": "noop",
    "body": ["() => undefined"],
    "description": "noop"
  },

  "import": {
    "prefix": "import",
    "body": ["import { $2 } from '$1';"],
    "description": "import"
  },

  "describe test": {
    "prefix": "desc",
    "body": ["describe('$0', () => {", "", "});"],
    "description": "describe test"
  },

  "create test": {
    "prefix": "itt",
    "body": [
      "it('$0', () => {",
      "  const expected = '';",
      "  const result = '';",
      "  expect(result).toEqual(expected);",
      "});"
    ],
    "description": "create test"
  },

  "create test with spy": {
    "prefix": "ittspy",
    "body": [
      "it('calls $0', () => {",
      "  spyOn(component, '$0').and.returnValue(null);",
      "  component.();",
      "  expect(component.$0).toHaveBeenCalled();",
      "});"
    ],
    "description": "create test with spy"
  },

  "filter": {
    "prefix": "filter",
    "body": ["filter((v,i,a) => a.indexOf(v) === i)"],
    "description": "filter unique values in an array"
  }
}
```
