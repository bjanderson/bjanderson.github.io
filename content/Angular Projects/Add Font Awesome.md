---
title: Add Font Awesome
date: 2025-09-30
description:
draft: false
tags:
aliases:
cssclasses:
---

If you want to quickly and easily install font awesome and use it with your material icons, this is how you do it.

## Install

Note: If you have the paid version, be sure to add your authToken to your .npmrc file - but you probably already knew that if you bought the license...

```bash
npm i -S @fortawesome/fontawesome-free
```

## Configure

Add the font-awesome css to your `angular.json` styles array.

```json
{
...
  "architect": {
    "build": {
      "options": {
        "styles": [ "node_modules/@fortawesome/fontawesome-free/css/all.min.css"]
      }
    }
  }
}
```

You can also set your default font set class using the MatIconRegistry. It's easy enough to do that in the constructor of your app.module.ts file by adding it to the AppModule constructor.

```typescript
constructor(public matIconRegistry: MatIconRegistry) {
  matIconRegistry.setDefaultFontSetClass('fas');
}
```

But we will run into some edge cases later on with Storybook and Cypress that will make this not work for them.

So you have two alternatives to make your fontawesome icons work in all environments.

The simplest is to just add the fontSet property to every icon in your app - then you don't need to set a default font set class - since it will always be applied explicitly - like this:

```ini
<mat-icon class="icon" aria-hidden="true" fontSet="fas" fontIcon="fa-list-check"></mat-icon>
```

The other is to create a separate module for applying the default font set class, and import that module wherever you need that setting to be applied - like this:

`src/app/mat-icon-registry.module.ts`

```typescript
import { NgModule } from "@angular/core"
import { MatIconRegistry } from "@angular/material/icon"

@NgModule({
  imports: [],
  providers: [],
})
export class MatIconRegistryModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.setDefaultFontSetClass("fas")
  }
}
```

Then remove the constructor from app.module.ts and import the MatIconRegistryModule instead.

`src/app/app.module.ts`

```typescript
import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { AppHeaderComponent } from "./components/app-header"
import { MatIconRegistryModule } from "./mat-icon-registry.module"

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppHeaderComponent,
    MatIconRegistryModule,
  ],
  providers: [],
})
export class AppModule {}
```

And now you can add the MatIconRegistryModule to the imports in your stories and cypress tests and font-awesome will work as expected.

It's up to you whether you want to explicitly apply the fontSet to every icon (easier if you create a snippet to do that), or if you want to set the default setting once and for all.

Personally I think it's less complicated to just set the fontSet property on every icon, which is why I created a snippet for that in my VS Code html snippets. And that is the method I will be using in this application. Plus, if you're using fontawesome pro and using different font sets from it, then who's to say that you even want a default font set class anyways. I just wanted to mention it because it took me a while to figure it out.

## Use

And now you can use @angular/material icons with Font Awesome icons like this:

```
<mat-icon fontSet="fas" fontIcon="fa-bell"></mat-icon>
```

For more info, check the docs at: https://github.com/FortAwesome/Font-Awesome
