---
title: Setup Styles
date: 2025-09-30
description:
draft: false
tags:
aliases:
cssclasses:
---

You set up the basic structure for styles when you created the [[New Angular Project]], but let's take that a step further now that we have some UI components on the screen.

First I'm going to add a simple color palette:

`src/styles/_colors.scss`

```scss
$black: #000000;
$black-two: #2d2d2d;
$black-three: #303030;

$white: #ffffff;
$white-two: #efefef;
$white-three: #e0e0e0;

$red: #ff006e;
$orange: #ff6600;
$yellow: #ffbe0b;
$green: #7cb518;
$blue: #3a86ff;
$purple: #8338ec;

$light-mode-bg-color: $white;
$light-mode-color: $black;

$dark-mode-bg-color: $black-three;
$dark-mode-color: $white-three;

$link-color: $yellow;
```

And a simple font palette:

`src/styles/_fonts.scss`

```scss
$roboto: Roboto, "Helvetica Neue", sans-serif;
```

Then I'm going to beef up my \_dom.scss:

`src/styles/_dom.scss`

```scss
@import "src/styles/_colors.scss";
@import "src/styles/_fonts.scss";

html,
body {
  box-sizing: border-box;
  font-size: 100%;
  height: 100%;
  min-height: 100vh;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

body {
  animation: fade-in 0.3s ease-out;
  min-height: 100vh;
  height: 100%;
  margin: 0;
  padding: 0.5rem;
  font-family: $roboto;

  background-color: $light-mode-bg-color;
  color: $light-mode-color;

  &.dark-mode {
    background-color: $dark-mode-bg-color;
    color: $dark-mode-color;
  }
}

@media (prefers-reduced-motion: reduce) {
  body {
    animation: none;
  }
}

a,
a:active,
a:hover,
a:visited {
  color: $link-color;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: bold;
}

h1 {
  font-size: 1.5rem;
}
h2 {
  font-size: 1.4rem;
}
h3 {
  font-size: 1.3rem;
}
h4 {
  font-size: 1.2rem;
}
h5 {
  font-size: 1.1rem;
}
h6 {
  font-size: 1rem;
}

hr {
  margin: 1.5rem;
}

p {
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 0.5rem 0;
}
```

Then I will set dark-mode as my default style in `src/index.html`

```ini
<body class="dark-mode mat-typography">
  <myapp-root></myapp-root>
</body>
```

And I will make the app header look better by updating the html:

`src/app/components/app-header/app-header.component.html`

```ini
<div class="app-header">
  <div class="title">
    <mat-icon class="icon" aria-hidden="true" fontSet="fas" fontIcon="fa-list-check"></mat-icon>
    MyApp
  </div>

  <nav class="app-nav">
    <a class="app-nav-item" [routerLink]="['/home']" [routerLinkActive]="'active'">Home</a>
    <a class="app-nav-item" [routerLink]="['/about']" [routerLinkActive]="'active'">About</a>
  </nav>
</div>
```

and the scss:

`src/app/components/app-header/app-header.component.scss`

```scss
@import "src/styles/_colors.scss";

:host {
  .app-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid $black;
    padding-bottom: 0.5rem;

    .title {
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      color: $yellow;

      .icon {
        margin-right: 0.5rem;
      }
    }

    .app-nav {
      display: flex;

      .app-nav-item {
        margin-left: 1rem;
        text-decoration: none;
        color: $link-color;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
```
