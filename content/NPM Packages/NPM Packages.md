---
title: NPM Packages
date: 2025-10-04
description:
draft: false
tags:
aliases:
cssclasses:
---

I'm assuming you already know how to install npm packages, but if you want to build reusable code for the front-end then you need to learn how to build and [publish](https://docs.npmjs.com/cli/v9/commands/npm-publish?v=true) npm packages. You can choose from many different ways to publish your npm package whether from the public npm repository, a github repository, or your own private npm repo, but one thing is certain - if you're doing JavaScript development, then npm is going to be involved in the process somewhere.

Like everything else we developers do, once you get the hang of it, it's actually a very easy process. And the more you do it, the more opportunities you will find for automating things. But we must walk before we run...

Before we get into creating an npm package, we need to decide where it is going to live. Will it be available to the public? Is it proprietary and need to be protected? Or, are you just learning and experimenting?

I'll walk you through my process as an example, and that should give you enough information so that you can figure out how to do things your way.

## Package Setup

Npm packages don't have to be huge. In fact, the only thing that's absolutely required to create one is a package.json file with a name and a version. Technically, everything else is optional.

So, to show you an example of the bare minimum, here's an example package.json file that you could publish as an npm package.

```json
{
  "name": "unique-package-name",
  "version": "0.0.1"
}
```

Of course, that is useless, so you will want to add some functionality to your package. For the sake of keeping it easy, I'm just going to use a single file that defines a simple function. I will name the file index.js.

```javascript
/** index.js */

module.exports = function isString(obj) {
  return typeof obj === "string"
}
```

Now all we have to do is add that file to our package.json file, and we will have a technically complete npm package.

```json
{
  "name": "unique-package-name",
  "version": "0.0.1",
  "main": "index.js"
}
```

Two more things that you should absolutely add to every package you create are a license and a readme.

The [license](https://opensource.org/licenses) tells potential users the limitations that you have (or have not) put on who may use your package, and how they can use it. To include it in your npm package, add a file named LICENSE - with the text of the license - to your package folder, and an additional field in your package.json file that is set to the tile of your license - e.g. "MIT".

So now your package.json file would look like this:

```json
{
  "name": "unique-package-name",
  "version": "0.0.1",
  "main": "index.js",
  "license": "MIT"
}
```

The readme file should provide an overview of what your package does, and instructions on how to use it. The readme file just needs to be a file named [README](https://en.wikipedia.org/wiki/README), which typically contains [Markdown](https://en.wikipedia.org/wiki/Markdown), but could also just contain plain text. If you are using Markdown in your readme file, then give it the file extension .md so it will be displayed correctly in Github and npmjs.com. There is no need to add the readme file to your package.json - npm will look for it automatically, it just needs to be located in the same folder as your package.json file.

Finally, you could add [extra details](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) to your package to show that you're a pro. Let's add the author and description fields...

```json
{
  "name": "unique-package-name",
  "version": "0.0.1",
  "main": "index.js",
  "license": "MIT",
  "author": "Your Name <your@email.com> (https://your-website.com/)",
  "description": "A description of the purpose this npm package serves"
}
```

At this point you would have the following files in your project folder.

- index.js
- package.json
- LICENSE
- README.md

This might seem like a very minimal example, and it is, but the point was to show you the bare minimum of what an npm package is made up of without any other tooling or project architecture muddying the waters.

## Package Naming

I also want to quickly touch on package naming. Packages named in the format @scope/package-name are called scoped packages. You might wonder how to group your packages under a given package scope, like I have done with @bjanderson/utils.

If you have a private repo in Verdaccio then package scopes are applied automatically based on the name field in your package.json file. But, if you want to have scoped packages in the public npm repo, then you first have to create an organization for your scope on npmjs.com.

By default, the npm publish command will only allow you to use scoped packages if you have a paid account on npmjs.com. If you want to publish a scoped package with a free account then you have to add the --access public flag to your publish command.

```bash
npm publish --access public
```

## Specify What To Include In Your Package

At this point if you publish your package, npm will publish everything in your package folder. npm does automatically exclude some things from being published - such as your node_modules folder, but not many. And it does automatically include some things - like your package.json file. But, when you build a larger, more complex project, you will likely have build tools, linters, code formatters, tests, and other things that you don't want to be published as part of the package, and you need to tell npm specifically either what to exclude or what to include. Your npm package is not a copy of your source code. It is actually just the working part of your project; the part that will work for anyone who installs it as a dependency.

There are several methods available to define what you want to include in, or exclude from, your package, and there are actually a lot of details pertaining to this, so it's best if you read the docs for yourself (https://docs.npmjs.com/files/package.json#files).

The method I use is to define the "files" array in my package.json. Anything in that array will get included in my published package - given that it's not on the list of things that always get excluded.

Npm will also exclude anything that's in your .gitignore file. And you can create a .npmignore file to define other things you want to exclude.

With that in mind, my package.json file would now look like this:

```json
{
  "name": "unique-package-name",
  "version": "0.0.1",
  "main": "index.js",
  "license": "MIT",
  "author": "Your Name",
  "description": "A description of the purpose this npm package serves",
  "files": ["index.js", "package.json", "LICENSE", "README.md"]
}
```

## Dependencies

When someone installs your npm package, npm will also install everything in your package.json dependencies array, but it won't install anything that's in your devDependencies or peerDependencies arrays. With that in mind, you should never put anything in your dependencies array in your npm packages. You should list all of your packages runtime dependencies as peerDependencies and specify a valid version range for them. That way you won't force your package's consumers to download things that may conflict with other packages they have installed. If your package's consumer does not have a required peerDependency installed, they will receive a warning from npm advising them what they need to install. Otherwise your package will just use whatever packages they have already installed, and not install anything else for them.

For example, if you create a package that has angular dependencies, then there's a good chance that the consuming project already has angular installed, and probably not the same version as your package. If you were to put your angular dependencies in your package.json dependencies then, when the consumer installs your package, they will automatically install the version of angular that's specified in your package.json. If they already have angular installed and it's at a different version, they will get errors during the install, and they will get frustrated and probably choose not to use your package.

To avoid this, you should always specify your package's dependencies in your package.json peerDependencies, so that your package's consumer will get a warning if they do not have a compatible version of a dependency installed, but it won't send them down the rabbit hole of version errors.

However, what you define in your package.json peerDependencies don't get installed when you run npm install. So, how do you get those dependencies installed on your machine so you can develop your library? The best advice I have found on this is to also include your peerDependencies packages in your devDependencies. That way they don't get installed by your package's consumer, your package's consumer still gets the version warning from your peerDependencies, and the packages still get installed in your node_modules folder thanks to them being in your devDependencies. It's not ideal, and there are other tools you can install that will install your peerDependencies for you. I've even written scripts to install my peerDependencies for me. But adding them to my devDependencies is just easier and more reliable.

And one final tip. You can, and I think should, save your dependencies and devDependencies package versions with a specific version (by removing the version wildcards ^ and ~), and only upgrade them on purpose. You can tell npm to do this automatically by setting save-exact=true in your npmrc file.

However, you should not lock your peerDependencies down to one specific version, as that will also make your package's consumers unhappy by forcing them to use specific versions of their dependencies. Doing this will make your package incompatible with other packages that are not be on the same upgrade cycle as you. Let your peerDependencies package versions span the widest range that works (by using those version wildcards ^ and ~), so that you can ensure maximum flexibility for those who use your package.

## Preparing Your Project For Publishing

Unless you're brand new to JavaScript development, you know that there are many different tools and transpilers and pre-processors that your code must run through before it can actually run. The general standard is to store your source code in a folder named src and your transpiled, processed, executable code in a folder named dist. If your code needs to be processed before it can be executed, then you don't want to point your package.json main field to your src/index.js, you want to point it to your dist/index.js.

If, like me, you are using some other fancy language, such as TypeScript, to write your JavaScript, then you might also need to include things like type definitions in your published package. Thankfully, in the case of TypeScript at least, there's a field you can add to your package.json called types, which is kind of like main except it points to your type definitions file - e.g. "types": "dist/index.d.ts". This allows other projects that use TypeScript to import your package and automatically have all the types defined with it.

And, in order to make sure that only your transpiled code gets published you would add your dist/ folder to your "files" array in package.json.

When you are finally ready to publish your package to Verdaccio or npm, you should remember to test it, build it, increment the version, and finally publish it. All of this testing and building and versioning can lead to a lot of command typing if we let it. Fortunately, npm gives us a way to automate most of this work with scripts. The following is a snippet from how I like to set up my package.json scripts to handle my package build and deployment process.

```javascript
"scripts": [
  "build": "[your build command here]",
  "prebuild": "npm test && rimraf dist/",
  "prepush": "npm run build",
  "push": "npm publish --registry http://localhost:4873",
  "push:major": "npm run version:major && npm run push",
  "push:minor": "npm run version:minor && npm run push",
  "push:patch": "npm run version:patch && npm run push",
  "test": "[your test command here]",
  "version:major": "npm version major --no-git-tag-version",
  "version:minor": "npm version minor --no-git-tag-version",
  "version:patch": "npm version patch --no-git-tag-version"
]
```

Then, whenever I want to push a patch to my package I just run:

`npm run push:patch`

and my package is tested, built, versioned, and published - all with one command.

Note: If you want to automatically create a tag with each new version, just remove the --no-git-tag-version flag from the version commands, and you will have a tag for your releases that matches the version.

## Local Repo

If you want to practice publishing npm repos privately, or just create private repos for your own use, without making them available to the public, I recommend using [[Verdaccio]].

## Github Repo

In this article, I'm assuming you will be storing your source code in a git repository, such as Github, and publishing your npm package to a dedicated npm repository. If you want to see how to publish your npm package on Github as well, check out this article from Github: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry

It covers what you need to do to set up authentication to your repo, so that you can control who can publish to it, and how to set up your npm registry settings to point the `npm publish` command at your repo.
