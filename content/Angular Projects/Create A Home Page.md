---
title: Create A Home Page
date: 2025-09-30
description:
draft: false
tags:
aliases:
cssclasses:
---

In order to make sure that everything you've installed and configured is working, let's setup up a few basic components and then run them through the full gamut of the tools.

Every app needs a home or landing page, and pretty much every app needs some kind of navigation, so let's create a Home page, an App Header, and an About page. And we'll do it using my custom schematics.

If you copied my [[bashrc]] file then you should already have some shortcut commands for running my schematics in your terminal. Remember to add the schematic defaults to your [[Add Custom Libraries And Schematics|angular.json]] file too.

Run the following:

```bash
ngcomponent home-page
ngcomponent app-header
ngcomponent about-page
```

First we'll add routes to the home and about pages to our app-routing module. I'm using the NgModule form, instead of the standalone component form, since that is what the angular cli generated. It should look like this:

`src/app/app-routing.module.ts`

```typescript
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },

  {
    path: "home",
    loadComponent: () => import("./components/home-page").then((c) => c.HomePageComponent),
  },

  {
    path: "about",
    loadComponent: () => import("./components/about-page").then((c) => c.AboutPageComponent),
  },

  {
    path: "**",
    redirectTo: "/home",
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Next we can add our AppHeaderComponent to our app.module and app.component.html.

`/src/app/app.module.ts`

```typescript
import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { AppHeaderComponent } from "./components/app-header"

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, AppHeaderComponent],
  providers: [],
})
export class AppModule {}
```

`/src/app/app.component.html`

```ini
<myproj-app-header></myproj-app-header>
<router-outlet></router-outlet>
```

Then we can set up our AppHeader with navigation to the Home and About pages.

First, add the RouterModule to the app-header.component.ts file.

`/src/app/components/app-header/app-header.component.ts`

```typescript
import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component } from "@angular/core"
import { RouterModule } from "@angular/router"

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "myproj-app-header",
  standalone: true,
  styleUrls: ["./app-header.component.scss"],
  templateUrl: "./app-header.component.html",
  imports: [CommonModule, RouterModule],
})
export class AppHeaderComponent {
  constructor() {}
}
```

Then you can set the routes in the html.

`/src/app/components/app-header/app-header.component.html`

```ini
<div class="app-header">
  <nav class="app-nav">
    <a class="app-nav-item" [routerLink]="['/home']" [routerLinkActive]="'active'">Home</a>
    <a class="app-nav-item" [routerLink]="['/about']" [routerLinkActive]="'active'">About</a>
  </nav>
</div>
```

And add some styles to the scss file

`/src/app/components/app-header/app-header.component.scss`

```scss
:host {
  .app-header {
    display: flex;

    .app-nav {
      display: flex;

      .app-nav-item {
        margin-right: 1rem;
      }
    }
  }
}
```

And that's it. You should now be able to run `nstart` in your terminal and run the app. Then open your browser to http://localhost:4200 to verify it works.
