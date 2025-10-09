---
title: Add Cypress
date: 2025-09-30
description:
draft: false
tags:
aliases:
cssclasses:
---

[Cypress](https://www.cypress.io/) is an end-to-end (E2E) testing system. It allows you to build automated tests for your UI that go beyond the scope of unit tests.

## Install Cypress

Since I'm running Linux, I first have to install some dependencies in my OS.

```bash
sudo apt install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

Then I can install cypress in my project.

```bash
npm i -D cypress
```

Next you should add a script to your `package.json` file to run cypress.

```json
{
  "scripts": {
    "cypress": "cypress open"
  }
}
```

## Configure Cypress

When you run Cypress for the first time it will ask you what type of testing you want to use - E2E or component focused.

E2E allows you to test your application as a whole, while component testing lets you test things in isolation.

I choose to use Cypress in E2E mode.

When you click your preferred option, Cypress will show you the config files it generates in your project.

It will also give you the option to generate some example tests - which I recommend if you haven't used Cypress before.

### tsconfig.json

One thing it did not generate - and is currently a known bug on Github - is the tsconfig file for cypress. As it is, it uses the main tsconfig file from your project, and then complains about the settings - preventing you from running tests in Cypress.

To fix that add this `tsconfig.json` file to your `cypress` folder.

```json
{
  "compilerOptions": {
    "target": "es2015",
    "types": ["cypress"],
    "lib": ["es2015", "dom"]
  },
  "include": ["../node_modules/cypress", "**/*.ts"]
}
```

Unfortunately Cypress overwrites some properties that Jest uses, so we also have to explicitly exclude cypress from our tsconfig.spec.json file.

So open your project `tsconfig.spec.json` file and cypress to the exclude array:

```json
{
  "exclude": ["node_modules", "cypress.config.ts", "cypress"]
}
```

Now Jest and Cypress should play nice together.

Then restart Cypress, and you should be able to run the example tests that it generated for you.

### cypress.config.ts

By default Cypress will detect which browsers you have installed and offer them as options for you to run your tests in. I have Brave installed and it did not detect it, so I have to add it by modifying `cypress.config.ts` to this:

```javascript
const { defineConfig } = require("cypress")
const execa = require("execa")
const findBrowser = () => {
  // the path is hard-coded for simplicity
  const browserPath = "/usr/bin/brave-browser"

  return execa(browserPath, ["--version"]).then((result) => {
    // STDOUT will be like "Brave Browser 77.0.69.135"
    const [, version] = /Brave Browser (\d+\.\d+\.\d+\.\d+)/.exec(result.stdout)
    const majorVersion = parseInt(version.split(".")[0])

    return {
      name: "Brave",
      channel: "stable",
      family: "chromium",
      displayName: "Brave",
      version,
      path: browserPath,
      majorVersion,
    }
  })
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return findBrowser().then((browser) => {
        return {
          browsers: config.browsers.concat(browser),
        }
      })
    },
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
    setupNodeEvents(on, config) {
      return findBrowser().then((browser) => {
        return {
          browsers: config.browsers.concat(browser),
        }
      })
    },
  },
})
```

And with that done you should now have cypress installed.

## First Component Test

To create your first component test in cypress add a file named app-header.component.cy.ts to your app-header folder:

`src/app/components/app-header/app-header/component.cy.ts`

```typescript
import { Component } from "@angular/core"
import { RouterModule } from "@angular/router"
import { AppHeaderComponent } from "./app-header.component"

@Component({
  template: ` <td-app-header></td-app-header> `,
})
class WrapperComponent {}

describe("AppHeaderComponent", () => {
  it("can mount using WrapperComponent", () => {
    cy.mount(WrapperComponent, {
      imports: [AppHeaderComponent, RouterModule.forRoot([])],
    })
    cy.get(".title").contains("TODO")
  })
})
```

## Run It

You can run cypress with:

```bash
npm run cypress
```

or

```bash
ncypress
```

Then choose to run component tests, and you should see your app-header in the tests.

## Commit

Remember to commit your progress before moving on to the next step.
