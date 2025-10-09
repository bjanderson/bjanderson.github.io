---
title: Verdaccio
date: 2025-10-04
description:
draft: false
tags:
aliases:
cssclasses:
---

For learning, and local development, I recommend installing an application named Verdaccio (https://github.com/verdaccio/verdaccio).

You can use Verdaccio as a private npm repo on your own machine as a sandbox environment. It allows you to try new things, make mistakes, and start over without worrying about breaking the internet.

You can install Verdaccio through npm:

```bash
npm i -g verdaccio
```

And run Verdaccio as a command line application:

```bash
verdaccio
```

You can also check out [the docs](https://verdaccio.org/docs/what-is-verdaccio) for more cli options.

Just like any other npm repository, you need to add a user to Verdaccio before you can publish anything:

```bash
npm adduser --registry http://localhost:4873
```

It will prompt you for a username and password. If you use Verdaccio as a private repo for your company's proprietary code, then I would suggest setting up a dedicated account to administer it, otherwise you probably just want to make this easy to remember. And you do want to remember them incase you need to login to verdaccio with that user again with:

```bash
npm login --registry http://localhost:4873
```

After you login, though, npm should automatically add an authToken to your global .npmrc file for your verdaccio connection, so you shouldn't need to re-login very often.

## Publish a package to your Verdaccio repo

Assuming you've started a project and are ready to publish it to your verdaccio server, you have to point your project to that repo using the registry parameter with the npm publish command:

```bash
npm publish --registry http://localhost:4873
```

And finally, to install a package from your Verdaccio repo you run it like any other npm install command, but you need to include the registry parameter:

```bash
npm install project-name --registry http://localhost:4873
```

## Scoped Packages

I recommend using scopes in your package names to make it easier for you to point your projects to a different registry than the normal npmjs.org registry. If you don't scope your package, then you're going to run into problems with installing packages from npmjs.org and trying to install your packages from your verdaccio server.

To do this you have to make sure your package name in package.json is scoped, e.g.

```json
{
  "name": "@example/project-name"
}
```

Then you can publish and install your @example scoped packages to verdaccio, and still use the regular npmjs.org registry too.

## Publish Registry Configs

To make your project automatically get published to your verdaccio repo without always typing the registry parameter - and make sure that your package does not get published to the public npm repo by accident - I recommend either adding the publishConfig setting to your ''//package.json//'' file, like so:

```json
{
  "publishConfig": { "@example:registry": "http://localhost:4873/" }
}
```

Or adding a .npmrc file to your project and add the registry setting to it:

```ini
@example:registry=http://localhost:4873
```

Note: If you set `"private": true` in your package.json file then your package won't be published anywhere, so make sure to set that to false and use the publishConfig setting if you're creating a package that you want to publish to your private repo.

Also worth noting here is the need to keep your package versions updated. If you try to publish your package with a version number that already exists in your verdaccio repo, the publish command will fail.

## Install Registry Configs

To automatically point npm to your verdaccio server for only your scopes projects, you can create a file named `.npmrc` in your project and put the registry setting in it, then you won't have to use the registry flag when you install your package.

```ini
@example:registry=http://localhost:4873
```

But, whenever you try to run npm commands in your project, make sure that verdaccio is running or you may get errors saying that your packages can't be found.

You can also set the registry setting in your global .npmrc file by running:

```bash
npm set @example:registry http://localhost:4873/
```

This will make any npm install command on your machine look for your scoped packages on your Verdaccio server, though, so you will have to make sure that Verdaccio is always running.

## Errors

I've run into errors when I start a new project that depends on a shared library from my company's private npm repo where npm install fails with strange permissions errors. Unfortunately the error messages can sometimes be unhelpful or even misleading. If you get permissions errors when starting a new project and you are using a private npm repo, make sure you are logged in to the npm repo by running:

```bash
npm login
```

If you don't have login permissions, you may need to exclude your private dependencies from the initial install, and comment out the registry setting in your .npmrc file, install everything from the public npm repo first, and then try installing your private packages again after everything else succeeds.

You can also view your verdaccio repo as a web site by opening a browser and going to your registry url [http://localhost:4873/](http://localhost:4873/)

## Not just for local use

Verdaccio is a great tool for learning how to create and publish npm packages on your own computer, but it can also be set up on a proper server and used as the npm registry for your organization - where your company can publish all of its private npm packages for internal use.

How to do that is beyond the scope of this guide, but I wanted you to at least know that it is possible.
