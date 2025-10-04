---
title: JavaScript Services
date: 2025-10-04
description:
draft: false
tags:
aliases:
cssclasses:
---

Services are the workhorse of your application code. You might also know them as the Controller part of the [Model-View-Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (MVC) architecture.

If models are the building blocks of your application, then services are what uses them to make the application work as a whole.

Services also do things like send and retrieve data from server APIs, and any other application data stores.

## Testing

One of the main concepts you will need to understand when it comes to services is [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection). That means that you provide instances of any dependencies to the service constructor. (As opposed to, say, you newing up an instance of a dependency within the service constructor.) This concept is at the heart of you making your application scaleable, maintainable, and testable.

When using dependency injection, you can mock out all the service's dependencies, so that you do not have to account for things like api access or database access within your tests.
