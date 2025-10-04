---
title: Add Jest For Unit Testing
date: 2025-10-04
description:
draft: false
tags:
aliases:
cssclasses:
---

If you have never used [Jest](https://jestjs.io/) for unit testing before, I highly recommend it. I discovered it a while ago when I started having problems with Karma failing on my CI server for no predictable reason.

Once I started using Jest, I discovered that it has a lot of nice features, and it has since become my default unit testing framework.

But, when you start a new Angular project, Karma is baked in, and it can be a bit of a chore to pry it out and replace it with Jest. Well, that is exactly what we're going to do in this article.

<div class="note">
Note: The Angular team did a survey and found out that many development teams do not like using Karma, and many preferred to use Jest instead, so they have committed to offering Jest as a fully supported test environment option in a future release. Also, the [Karma project](https://github.com/karma-runner/karma) has been deprecated.
</div>

As for now...

!! Remove Karma

The first step to replacing Karma is to remove it from your project.

Delete the file: `src/karma.conf.js`.

In `package.json` search (CTRL+F) for "karma" and remove all dependencies related to it:

```json
"@types/jasmine": "*",
"jasmine-core": "*",
"karma": "*",
"karma-chrome-launcher": "*",
"karma-coverage-istanbul-reporter": "*",
"karma-jasmine": "*",
"karma-jasmine-html-reporter": "*",
...
```

Remember to save your file before doing the next step.

!! Install Jest

```bash
npm i -D jest @types/jest jest-jasmine2 jest-preset-angular @angular-builders/jest
```

!! Configure Jest

!!! jest.config.js

Create a file in your project root directory named `jest.config.js` and add this to it:

```javascript
const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig")

module.exports = {
  collectCoverage: true,

  collectCoverageFrom: [
    "<rootDir>/src/app/**/*.ts",
    "!<rootDir>/src/app/**/*.stories.ts",
    "!<rootDir>/src/app/**/*.cy.ts",
    "!<rootDir>/src/app/**/index.ts",
    "!<rootDir>/src/app/**/*.module.ts",
  ],

  coverageDirectory: "coverage",

  coverageReporters: ["html", "text-summary"],

  maxWorkers: 4,

  moduleDirectories: ["node_modules", "<rootDir>"],

  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: "<rootDir>/",
    }),
  },

  modulePaths: ["<rootDir>"],

  roots: ["<rootDir>/src"],

  setupFilesAfterEnv: ["<rootDir>/src/test.ts"],

  testMatch: ["<rootDir>/src/app/*.spec.ts", "<rootDir>/src/app/**/*.spec.ts"],

  testPathIgnorePatterns: [
    "<rootDir>/.angular/",
    "<rootDir>/.storybook/",
    "<rootDir>/.vscode/",
    "<rootDir>/coverage/",
    "<rootDir>/cypress/",
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/src/app/*.(html|js|scss)$",
    "<rootDir>/src/app/*.(stories.ts|cy.ts)$",
    "<rootDir>/(index.ts)$",
    "<rootDir>/(module.ts)$",
  ],

  testRunner: "jest-jasmine2",

  transform: {
    "^.+\\.ts$": ["ts-jest", { isolatedModules: true }],
  },

  workerIdleMemoryLimit: "1GB",
}
```

I won't go into the meaning of each config setting, but you can find out more about them in the [Jest config docs](https://jestjs.io/docs/configuration).

!!! tsconfig.spec.json

Next open the `tsconfig.spec.json` file and change it to this:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "outDir": "./out-tsc/spec",
    "types": ["jest"]
  },
  "files": ["src/test.ts"],
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

!!! angular.json

Then open the `angular.json` file and replace the karma test config with this:

```json

        "test": {
          "builder": "@angular-builders/jest:run",
          "options": {
            "tsConfig": "tsconfig.spec.json"
          }
        },
```

That will allow you to run jest with the `ng test` command.

!!! package.json

And then add this to the scripts section of your `package.json` file:

```json
"test:cov": "ng test --coverage",
```

And that will allow you to collect test coverage by running `npm run test:cov`

!! Configure jsdom shims for Jest

Since Jest does not run in a browser, it uses [jsdom](https://github.com/jsdom/jsdom) to simulate the browser environment, and jsdom does not have a complete implementation of every browser feature available, so sometimes you have to add missing features to jsdom yourself via shims. You can add them to the `src/test.ts` file and they will be available to Jest when you run it.

Replace the contents of `src/test.ts` with this:

```javascript
import "jest-preset-angular/setup-jest"

Object.defineProperty(window, "CSS", { value: null })

Object.defineProperty(window, "getComputedStyle", {
  value: () => {
    return {
      display: "none",
      appearance: ["-webkit-appearance"],
    }
  },
})

Object.defineProperty(document, "doctype", {
  value: "<!DOCTYPE html>",
})
```

All this file is doing is adding features to the browser window and document objects that are available in a live browser.

!! Cleanup

Angular generates the tsconfig.json file with comments in it, but since we are reading it in out jest.config.js file, and comments are not a valid part of json documents, Jest will throw errors when you run it. If you get an error saying "Unexpected token / at position ..." when you run jest, then make sure to remove all comments from your tsconfig.json file.

!! Commit

Remember to commit your progress before moving on to the next step.
