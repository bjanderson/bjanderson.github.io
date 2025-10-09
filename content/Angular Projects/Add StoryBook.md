---
title: Add StoryBook
date: 2025-09-30
description:
draft: false
tags:
aliases:
cssclasses:
---

[Storybook](https://storybook.js.org/) is a tool that helps you build UI components in thoughtful way so that they can be used and re-used throughout your application. If you haven't heard about it before I recommend checking it out.

## Install StoryBook

Getting started with Storybook is actually very easy. When you run the installer, it will try to figure out what framework you are using, and set itself up with the correct configs for that framework. To get Storybook completely installed and configured for Angular, all you have to do is run:

```bash
npx storybook@latest init --type angular
```

It will prompt you for a few preferences, but it should do all the setup for you.

Note: If you committed your changes before installing storybook, then you should be able to easily see everything it did by viewing your git history in VS Code.

Then you will want to install support for the Angular router with:

```bash
npm i -D storybook-addon-angular-router
```

## Configure StoryBook

Then can tell Storybook to look for your stories in the same folder as the components themselves. You also need to tell storybook to use the angular router addon. I also turn off telemetry.

You can do this in `.storybook/main.ts`

```javascript
import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/app/components/**/*.stories.ts'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-angular-router',
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: 'tag',
  },
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};
export default config;
```

Also, we need to tell Storybook to ignore our Cypress tests (which we will set up next). To do that edit the storybook tsconfig.json file and add "../src/\*_/_.cy.ts" to the exclude array.

`.storybook/tsconfig.json`

```json
{
  "extends": "../tsconfig.app.json",
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "types": ["node"]
  },
  "exclude": ["../src/test.ts", "../src/**/*.spec.ts", "../src/**/*.cy.ts"],
  "include": ["../src/**/*", "./preview.ts"],
  "files": ["./typings.d.ts"]
}
```

## Run Storybook

Now you can run Storybook with:

```bash
npm run storybook
```

or

```bash
nstory
```

## Storybook Theme

Storybook will not apply any css styles applied to your html or body tags to the view container for your story. So if you set any theme styles on your body tag, such as padding/color/background/etc... those styles will not be applied when you view your stories. You will have to set up a separate Storybook theme in order to make that work.

Any other global styles you set should work, it just doesn't apply your body or html styles.

To learn more about Storybook theming check out the docs here: https://storybook.js.org/docs/react/configure/theming

## Your First Story

The story files for each component are now set up (in .storybook/main.ts) to live in the component folder with the rest of the component code. This makes it easier to keep everything lined up as your application grows, so you don't have to search through multiple folder trees in order to find all the files related to the same component.

So create a story file in the app-header component folder that looks like this:

`src/app/components/app-header/app-header.stories.ts`

```typescript
import { CommonModule } from "@angular/common"
import { MatIconModule } from "@angular/material/icon"
import { RouterModule } from "@angular/router"
import type { Meta, StoryObj } from "@storybook/angular"
import { moduleMetadata } from "@storybook/angular"
import { AppHeaderComponent } from "src/app/components/app-header"
import { MatIconRegistryModule } from "src/app/mat-icon-registry.module"

const meta: Meta<AppHeaderComponent> = {
  title: "Components/AppHeaderComponent",
  component: AppHeaderComponent,
  tags: ["autodocs"],
  render: (args) => ({ props: args }),
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterModule, MatIconModule, MatIconRegistryModule],
    }),
  ],
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<AppHeaderComponent>

export const Default: Story = {}
```

Notice how we can add the MatIconRegistryModule to the imports even though the AppHeaderComponent does not depend on it directly.

Now if you run storybook (`nstory`) you should see your app header as a standalone component.

## Commit

Remember to commit your progress before moving on to the next step.
