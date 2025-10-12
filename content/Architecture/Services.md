---
title: Services
date: 2025-10-09
description:
draft: false
tags:
aliases:
cssclasses:
---

This article is still a work in progress...

Services are the workhorse of your application code. You might also know them as the Controller part of the [Model-View-Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (MVC) architecture.

If [[Models]] are the building blocks of your application, then services are the plumbing, the electrical wiring, the internet connection, and the HVAC.
Think about the house or apartment where you live.
There are several services that provide all the functionality that you rely on from day to day.
You have an electric service provider - and how many things do you connect to that, and what services do those things provide to you.
You have water and sewer service - it's not glamorous, but it's essential.
You have AC and heating - again, it's behind the scenes, but you don't want to be without it.
You have your internet service provider, cell phone service provider, trash pickup service provider, and on, and on...
These are the things that make your home function, and it wouldn't be the same without them.
That's what services are to your application.

They do things like:

- send and retrieve data from server APIs
- create a central storage places for data in your application
- provide complex functionality that is reusable throughout the different views of your application

Services can range in complexity from very simple to very, very complex.
My goal is always to keep them as lean as possible and focused on very specific areas of functionality.
But some applications end up requiring a central "orchestration" type of service that acts as a sort of general manager, or central interface, where the bulk of the application data is manipulated and stored.

Just like models can contain other models, services can be composed of other services.
And that leads me to one of the main concepts you will need to understand when it comes to services - [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection).
That means that you provide instances of any dependencies to the service constructor - as opposed to, say, you newing up an instance of a dependency within the service constructor.
This concept is at the heart of making your application scaleable, maintainable, and testable.

Since JavaScript programs live primarily in the global scope, it's easy to create services as [singletons](https://en.wikipedia.org/wiki/Singleton_pattern) that are always available to the whole application.
This makes them a great place to store data so that it remains available and consistent no matter what part of the application you are in.
It also means that any given service can be passed to the constructor of any other service - as long as they are created (instantiated) in the correct order, and they do not form a circular dependency.

One caveat is not to overdo it though - particularly when it comes to manipulating the view.
Services should always be thought of as plubming, behind the scenes.
I draw the line at manipulating HTML or CSS.
Services should be JavaScript only because they are complicated enough without muddying the waters by messing around with the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).

---

## Examples

To demonstrate what I'm talking about without having to build out an entire UI project I'll create some examples using only nodejs.
That way you can easily copy and run the example code without also having to build out a whole project.

Let's start with a function that takes a file name, reads the file, and returns the contents of the file.

I like to follow the convention of naming my service files with the ending of `.service.js`, so I will name this file `io.service.js`.

```javascript
// io.service.js

import { readFileSync } from "fs"

export class IOService {
  constructor() {}

  getFileContents(fileName) {
    return readFileSync(fileName, { encoding: "utf8" })
  }
}
```

The service is a class that provides a single function, and has no dependencies injected into the constructor.
In order to use the function you need to create an instance of the class.

Next I'll create a script that uses this class to read a file.
The file I will be reading will be named `test-file.txt`, and just contains a simple text string.

```txt
This is a test.
```

The script that uses the service to read that file will be named `index.js`. It will simply get the file contents and output them with console.log.

```javascript
// index.js

import { IOService } from "./io.service.js"

const ioService = new IOService()

const fileName = "test-file.txt"
const fileContents = ioService.getFileContents(fileName)

console.log(fileContents)
```

You can run this script by typing `node index.js` into your terminal. Make sure your terminal is currently looking in the same directory where the files are stored...

When you run the script you should see `This is a test.` in your terminal.

(If you get an error try installing the latest version of nodejs, or you can rename your files to end in .mjs instead of .js)

<div class="note">
Now, you might be thinking to yourself that you could have just called the fs.readFileSync function statically in your script without needing to wrap it in a service, and you're right.
I'm just using this as a simple example to demonstrate the structure of a service.
I'm going to make this a little more complex now - trying to keep the code simple, while still demonstrating the additional concepts that services entail.
Don't get hung up on the readFileSync function being burried - instead look at how the structure of the services unfold.
</div>

If we tried to test our IOService, our test environment would need to have access to an actual file because the service is using the static fs.readFileSync method and it will throw errors if you don't give it a valid file.

Maybe we don't want to have to create extra files in our test environment, or maybe we don't want to give our test environment excessive access to our file system, or maybe we want to be able to simulate a successful file read and a failing file read in our test cases.
Whatever the case may be, it is better if we can somehow override the static dependency on fs.readFileSync in our tests.

We can do that by exporting the readFileSync method from another service, and inject that service as a dependency into our IOService.

I'll call the new service the NodeEnvService: `node-env.service.js`.

```javascript
// node-env.service.js

import { readFileSync } from "fs"

export class NodeEnvService {
  constructor() {
    this.readFileSync = readFileSync
  }
}
```

And we'll change the IOService to take an instance of the NodeEnvService as a depependency and use it instead of the static import of fs.readFileSync.

```javascript
// io.service.js

export class IOService {
  constructor(nodeEnvService) {
    this.nodeEnvService = nodeEnvService
  }

  getFileContents(fileName) {
    return this.nodeEnvService.readFileSync(fileName, { encoding: "utf8" })
  }
}
```

And we'll update our `index.js` script to create an instance of NodeEnvService and pass it to the IOService instance.

```javascript
// index.js

import { IOService } from "./io.service.js"
import { NodeEnvService } from "./node-env.service.js"

const nodeEnvService = new NodeEnvService()

const ioService = new IOService(nodeEnvService)

const fileName = "test-file.txt"
const fileContents = ioService.getFileContents(fileName)

console.log(fileContents)
```

Now, when we write tests for our IOService we can provide a mocked version of the NodeEnvService and have control over exactly how the readFileSync function behaves in the IOService tests.

And to take this example to completion, let's create another service that will allow us to read the fileName from the command line input.

Let's create a service named CLIService: `cli.service.js`

```javascript
// cli.service.js

export class CLIService {
  constructor(nodeEnvService) {
    this.nodeEnvService = nodeEnvService
  }

  getFileName() {
    return this.nodeEnvService.argv[2]
  }
}
```

This service needs to access the static `process.argv` in order to get the fileName from the command line input, so we are going to add that as another export from our NodeEnvService.

```javascript
// node-env.service.js

import { readFileSync } from "fs"

export class NodeEnvService {
  constructor() {
    this.readFileSync = readFileSync
    this.argv = process.argv
  }
}
```

And then we will create an instance of the CLIService in our index.js script, and use it to get the fileName.

```javascript
// index.js

import { CLIService } from "./cli.service.js"
import { IOService } from "./io.service.js"
import { NodeEnvService } from "./node-env.service.js"

const nodeEnvService = new NodeEnvService()

const ioService = new IOService(nodeEnvService)
const cliService = new CLIService(nodeEnvService)

const fileName = cliService.getFileName()
const fileContents = ioService.getFileContents(fileName)

console.log(fileContents)
```

By now you should get the concept of a service encapsulating functionality and making it available for use across your application.
There is one larger issue of how you would build an actual application using services.
The main question is how do you instantiate all of these services and make them available to your application.

There are several approaches you could take, but I will give you a simple one.

Let's keep our `index.js` the main entry point of our application, but let's only use it for initializing all the services and move all the other "application" code down into an application class.

I'll call it App: `app.js`

```javascript
// app.js

export class App {
  constructor(cliService, ioService, nodeEnvService) {
    this.cliService = cliService
    this.ioService = ioService
    this.nodeEnvService = nodeEnvService
  }

  run() {
    const fileName = this.cliService.getFileName()
    const fileContents = this.ioService.getFileContents(fileName)

    console.log(fileContents)
  }
}
```

Now we can take the "application code" out of the `index.js` file and replace it with an instance of the App.

```javascript
// index.js

import { CLIService } from "./cli.service.js"
import { IOService } from "./io.service.js"
import { NodeEnvService } from "./node-env.service.js"

const nodeEnvService = new NodeEnvService()

const ioService = new IOService(nodeEnvService)
const cliService = new CLIService(nodeEnvService)

const app = new App(cliService, ioService, nodeEnvService)
app.run()
```

The App class takes instances of all the dependencies and can do with them as it pleases without having to manage how they are initialized.
And since it takes the services in as dependencies to the constructor all of those services can easily be mocked out when you test the App code.

## Testing

When using dependency injection, you can mock out all the service's dependencies, so that you do not have to account for things like api access or database access within your tests.
