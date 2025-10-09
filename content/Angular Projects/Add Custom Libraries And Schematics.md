---
title: Add Custom Libraries And Schematics
date: 2025-09-30
description:
draft: false
tags:
aliases:
cssclasses:
---

I built a few different libraries and a set of Angular schematics that I use in every one of my projects. My packages are hosted on Github, though, so I have to point npm to my Github repo in order to install them.

So, first I create a new file, named `.npmrc` in my angular project folder, and add the following config to it.

```ini
fund=false
package-lock=false
save=true
save-exact=true

@bjanderson:registry=https://npm.pkg.github.com
```

You can check out the [npm docs](https://docs.npmjs.com/cli/v9/using-npm/config) if you're interested in what the options mean, but those are my preferred defaults for npm. Plus it points npm to my github repo when I install any of my scoped packages.

And with that in place I can now run:

```bash
npm i -S @bjanderson/utils @bjanderson/ng-common
npm i -D @bjanderson/ng-schematics
```

Then I set up my default params for my schematics in my angular.json file, so I don't have to type them every time I run a schematic.

```json
{
  ...
  "projects": {
    "project-name": {
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        },
        "@bjanderson/ng-schematics:component": {
          "prefix": "myprj"
        },
        "@bjanderson/ng-schematics:dialog": {
          "prefix": "myprj"
        },
        "@bjanderson/ng-schematics:table": {
          "prefix": "myprj"
        },
        "@bjanderson/ng-schematics:table-with-data-source": {
          "prefix": "myprj"
        },
        "@bjanderson/ng-schematics:table-with-server-side-data-source": {
          "prefix": "myprj"
        }
      },
    }
  }
}
```

Make sure to set the prefix to whatever your project prefix is. You can find your project prefix by searching for "prefix" in your angular.json file. It should be whatever you passed to the `--prefix` flag when you created the angular project with `ng new`.

At this point I would commit my progress in preparation for the next step. Again, using the alias commands from my .bashrc file.

```bash
gs
ga
gc "added my project repo"
gcmaster
git pull
gmedits
git push
gnewedits
```

Notice, I did not create aliases for `git pull` or `git push` because I don't want to accidentally run those via a typo.

Now my code is committed, and I'm on a fresh edits branch ready for the next task.
