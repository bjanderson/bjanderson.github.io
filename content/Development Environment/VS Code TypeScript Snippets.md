---
title: VS Code TypeScript Snippets
date: 2025-10-04
description:
draft: false
tags:
aliases:
cssclasses:
---

```json
{
  "Create Server Model": {
    "prefix": "smodel",
    "body": [
      "import { getObject, getString } from '@bjanderson/utils';",
      "import { IHasPK } from './ihaspk';",
      "",
      "export class $0 implements IHasPK {",
      "  pk: string;",
      "",
      "  constructor(o?: Partial<$0>) {",
      "    const obj: Partial<$0> = getObject(o);",
      "    this.pk = getString(obj.pk);",
      "  }",
      "}"
    ],
    "description": "Create Server Model"
  },

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

  "Print error to console": {
    "prefix": "lerror",
    "body": ["console.error(`ERROR : $1 : ${$0}`);"],
    "description": "Log error to console"
  },

  "initialize model object": {
    "prefix": "ob",
    "body": ["obj = getObject(obj);"],
    "description": "initialize a model object"
  },

  "noop": {
    "prefix": "noop",
    "body": ["() => undefined"],
    "description": "noop"
  },

  "import": {
    "prefix": "bimport",
    "body": ["import { $2 } from '$1';$0"],
    "description": "import"
  },

  "export": {
    "prefix": "bexport",
    "body": ["export * from '$1';$0"],
    "description": "export"
  },

  "describe test": {
    "prefix": "desc",
    "body": [
      "describe('$0()', () => {",
      "  beforeEach(() => {",
      "    init();",
      "  });",
      "",
      "  it('is a function', () => {",
      "    expect(typeof component.$0).toEqual('function');",
      "  });",
      "});"
    ],
    "description": "describe test"
  },

  "create test": {
    "prefix": "itt",
    "body": [
      "it('$0', () => {",
      "  const expected = {};",
      "  const result = {};",
      "  expect(result).toEqual(expected);",
      "});"
    ],
    "description": "create test"
  },

  "create test with spy": {
    "prefix": "ittspy",
    "body": [
      "it('calls $0()', () => {",
      "  const spy = jest.spyOn(component, '$0');",
      "  component.();",
      "  expect(spy).toHaveBeenCalled();",
      "});"
    ],
    "description": "create test with spy"
  },

  "create init function": {
    "prefix": "finit",
    "body": ["function init() {", "  $0", "}"],
    "description": "create init function"
  },

  "ngOnDestroy unsubscribe": {
    "prefix": "ngOnDestroy",
    "body": [
      "unsubscribe = new Subject();",
      "ngOnDestroy(): void {",
      "  this.unsubscribe.next();",
      "  this.unsubscribe.complete();",
      "}"
    ],
    "description": "ngOnDestroy unsubscribe"
  },

  "new class": {
    "prefix": "exportclass",
    "body": [
      "import { getObject, getString } from '@bartleyanderson/utils';",
      "",
      "export class $0 {",
      "",
      "  value: string;",
      "",
      "  constructor(obj?: Partial<$0>) {",
      "    obj = getObject(obj);",
      "    this.value = getString(obj.value);",
      "  }",
      "}"
    ],
    "description": "new class"
  },

  "mockservice": {
    "prefix": "mockservice",
    "body": ["const $0: any = {", "  $0: () => undefined,", "};"],
    "description": "mock test service"
  },

  "filter": {
    "prefix": "filter",
    "body": ["filter((v,i,a) => a.indexOf(v) === i)"],
    "description": "filter unique values in an array"
  }
}
```
