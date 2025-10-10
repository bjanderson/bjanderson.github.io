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
You have your internet service provider, cell phone service provider, perhaps cable TV service provider, trash pickup service provider, and on, and on...
These are the things that make your home function, and it wouldn't be the same without them.
That's what services are to your application.

They do things like:

- send and retrieve data from server APIs
- create a central storage places for data in your application
- provide complex functionality that is reusable throughout the different views of your application

Services can range in complexity from very simple to very, very complex.
My goal is to keep them as lean as possible and focused on very specific areas of functionality.
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

## Testing

When using dependency injection, you can mock out all the service's dependencies, so that you do not have to account for things like api access or database access within your tests.
