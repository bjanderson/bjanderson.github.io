---
title: New Angular Project
date: 2025-09-30
description:
draft: false
tags:
aliases:
cssclasses:
---

If you're new to Angular, I highly recommend taking a walk through the tutorial at https://angular.io/tutorial. The first part of the tutorial is instructions on how to install Node and Angular, and get things running.

That being said, this will not be an in-depth article since the tutorial and the Angular docs already do a good job of covering that. I will simply give you a quick overview of how I get a new Angular project started.

The first step in starting a new Angular project is to install the Angular cli.

```bash
npm i -g @angular/cli@latest
```

Then you can easily generate a new project using the cli

```bash
ng new my-project --prefix=myprj --style=scss --routing=true
```

The options tell Angular to set some configuration settings for your project.

- --prefix tells angular that all of your component html tags will be prefixed with myprj-. This will be checked at build time and during linting. You want to set this to something that will differentiate your components from any other angular or third party components in order to avoid naming conflicts for your Angular components.
- --style tells Angular to use SCSS as the css pre-processor for your project. It will automatically set up the build chain for this and create all of your stylesheets as .scss files.
- --routing tells angular to generate boiler-plate code for setting up routing for your application.
  There are other options available. You can see the full list in the docs at https://angular.io/cli.
  Once you generate your new project, you can cd into your project directory and run it.

```bash
cd my-project
npm start
```

And your project will be hosted at http://localhost:4200/

## Angular Material and SCSS

If you plan to use Angular Material then now is the time to install that. Thankfully, Angular offers a convenient way to add it to your project

```bash
ng add @angular/material
```

I usually answer yes to all the prompts, but feel free to dig in to the details at https://material.angular.io/guide/schematics

And I like to set up the Angular Material theme in it's own top-level file, next to styles.scss. Note, I'm using the deeppurple-amber theme, so make sure to set your primary and accent colors to whatever matches the theme you chose when you added @angular/material.

`src/material.scss`

```scss
@use "@angular/material" as mat;

$primary: mat.define-palette(mat.$deep-purple-palette, 500);
$accent: mat.define-palette(mat.$amber-palette, A200, A100, A400);
$warn: mat.define-palette(mat.$red-palette);

$theme: mat.define-light-theme(
  (
    color: (
      primary: $primary,
      accent: $accent,
      warn: $warn,
    ),
    typography: mat.define-typography-config(),
    density: 0,
  )
);
```

Then make sure to include your material.scss file in the styles array in your angular.json file.

```json
"styles": [
  "@angular/material/prebuilt-themes/deeppurple-amber.css",
  "src/material.scss",
  "src/styles.scss"
],
```

I also create a folder to keep all of my global styles in, and in that folder I create another folder dedicated to my global Angular Material style overrides.

You can create these folders with this command:

```bash
mkdir -p src/styles/material-overrides
```

Then I move all the contents of the styles.scss file into a file named \_dom.scss in the styles folder.

`src/styles/_dom.scss`

```scss
html,
body {
  height: 100%;
}

body {
  margin: 0;
  font-family: Roboto, "Helvetica Neue", sans-serif;
}
```

And then import that back into the styles.scss file.

`src/styles.scss`

```scss
@import "src/styles/_dom.scss";
```

And in the material-overrides folder I will create a file for each Angular Material Component and override its default styles in there so they apply globally to my app.

`src/styles/material-overrides/_mat-icon.scss`

```scss
mat-icon.mat-icon {
  margin: 0;
}
```

Notice: you have to make the css selector more specific than Angular Material's for it to work. This is easily done by prefixing the tag to the css class.

Then I create a file to gather all my material overrides into one place.

`src/styles/material-overrides/_material-overrides.scss`

```scss
@import "src/styles/material-overrides/_mat-icon.scss";
```

And then I import that back into the styles.scss file.

`src/styles.scss`

```scss
@import "src/styles/material-overrides/_mat-overrides.scss";

@import "src/styles/_dom.scss";
```

Now you should have a good foundation for building out your application styles.

## That's it

From here, you can start building your application. If you want to take advantage of Angular CLI's built in schematics check out the docs at https://angular.io/cli/generate

And, don't forget to take a look inside the package.json file to see what commands are configured out of the box. There are commands for building, linting, testing, and more.

And with that you have a fresh default Angular project.
