---
title: VS Code TypeScript Snippets
date: 2025-10-01
description:
draft: false
tags:
aliases:
cssclasses:
---

```json
{
  "filterunique": {
    "prefix": "filterunique",
    "body": ["${TM_SELECTED_TEXT}.filter((v,i,a) => a.indexOf(v) === i)"]
  },

  "filteruniqueobject": {
    "prefix": "filteruniqueobject",
    "body": ["${TM_SELECTED_TEXT}.filter((v,i,a) => a.findIndex((x) => x.id === v.id) === i)"]
  },

  "sort": {
    "prefix": "sort",
    "body": ["${TM_SELECTED_TEXT}.sort((a,b) => a.localeCompare(b))"]
  },

  "noop": {
    "prefix": "noop",
    "body": ["() => undefined"]
  },

  "import": {
    "prefix": "import",
    "body": ["import { $2 } from '$1';$0"]
  },

  "export": {
    "prefix": "export",
    "body": ["export * from '$1';$0"]
  },

  "mockservice": {
    "prefix": "mockservice",
    "body": ["const $0: any = {", "  $0: () => undefined,", "};"]
  },

  "import-angular-core-mock": {
    "prefix": "import-angular-core-mock",
    "body": ["import '../../../mocks/@angular/core/core.mock';"]
  },

  "describe test": {
    "prefix": "describetest",
    "body": [
      "describe('$1', () => {",
      "  beforeEach(() => {",
      "    init();",
      "  });",
      "",
      "  it('has a function named $1', () => {",
      "    expect(typeof ${2|component,service|}.$1).toEqual('function');",
      "  });",
      "",
      "  it('returns expected', () => {",
      "    const expected = '';",
      "    const result = ${2|component,service|}.$1();",
      "    expect(result).toEqual(expected);",
      "  });",
      "});"
    ]
  },

  "it test": {
    "prefix": "ittest",
    "body": [
      "it('returns expected', () => {",
      "  const expected = '';",
      "  const result = ${2|component,service|}.$1();",
      "  expect(result).toEqual(expected);",
      "});"
    ]
  },

  "it test spy": {
    "prefix": "itspy",
    "body": [
      "it('calls $1', () => {",
      "  const spy = spyOn(${2|component,service|}, '$1').and.callThrough();",
      "  const arg = 'test arg';",
      "  const request = new Request({ arg });",
      "  ${2|component,service|}.$3(request);",
      "  expect(spy).toHaveBeenCalledWith(arg);",
      "});"
    ]
  },

  "mock function spy from clipboard": {
    "prefix": "mockfunctionspy",
    "body": [
      "export const calls${CLIPBOARD/^(\\S+)\\s+(.*)$/${1:/capitalize}/g}${CLIPBOARD/^(.*?)\\s+(.*)/${2:/capitalize}/g} = (testSubject: () => unknown, calledWith?: unknown[]) => {",
      "  it('calls ${CLIPBOARD/^(\\S+)\\s+(.*)$/$1/g}.${CLIPBOARD/^(.*?)\\s+//g}', () => {",
      "    const spy = spyOn(${CLIPBOARD/^(\\S+)\\s+(.*)$/$1/g}, '${CLIPBOARD/^(.*?)\\s+//g}').and.callThrough();",
      "    testSubject();",
      "    callsSpy(spy, calledWith);",
      "  });",
      "};"
    ],
    "description": "copy a service name and a function name (multi-cursor) to the clipboard and run this snippet to create a mock test from them"
  },

  "mock selected function spy": {
    "prefix": "mockselectedfunctionspy",
    "body": [
      "export const callsSvc${TM_SELECTED_TEXT/^(.*?);/${1:/capitalize}/g} = (testSubject: () => unknown, calledWith?: unknown[]) => {",
      "  it('calls svc.${TM_SELECTED_TEXT/^(.*?);/$1/g}', () => {",
      "    const spy = spyOn(svc, '${TM_SELECTED_TEXT/^(.*?);/$1/g}').and.callThrough();",
      "    testSubject();",
      "    callsSpy(spy, calledWith);",
      "  });",
      "};"
    ],
    "description": "highlight a function name and type mockselectedfunctionspy to run this snippet and create a mock test from the highlighted text"
  },

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
    "prefix": "clog",
    "body": ["console.log('$0');"],
    "description": "Log output to console"
  },

  "Print vlaue to console": {
    "prefix": "clvalue",
    "body": ["console.log('$0: ', $0);"],
    "description": "Log value to console"
  },

  "Print error to console": {
    "prefix": "clerror",
    "body": ["console.error(`ERROR : $1 : ${$0}`);"],
    "description": "Log error to console"
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
    "prefix": "newclass",
    "body": [
      "import { getObject, getString } from '@bjanderson/utils';",
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
  }
}
```
