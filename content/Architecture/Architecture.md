---
title: Architecture
date: 2025-10-04
description:
draft: false
tags:
aliases:
cssclasses:
---

The word architecture probably brings to mind blueprints, and large buildings. Architecture deals with the design and planning of complex structures.

Since software is a complex structure, it makes sense to approach its development from an architectural perspective, and that is how I approach it, and how I have tried to lay out this wiki - so that each piece is placed in the correct spot related to all the others.

[Software architecture](https://en.wikipedia.org/wiki/Software_architecture) in general is a subject that is a bit beyond the scope of this wiki, but I am going to demonstrate it throughout, so you might understand everything better if you are familiar with the concept.

Software architecture as it relates to web development is quite broad. You have to consider many things. At a high level these things will include:

- Data Storage
- Server configuration
- Code Infrastructure and Layout
- UI frameworks
- Security
- Testing
- Maintenance

Like I said, in general the subject is a bit beyond the scope of this wiki, but I do recommend that you have some familiarity with it.

In the spirit of being a bit more specific, here are some goals of UI architecture that I try to achieve:

- Reliable
  - Validate input from the user
  - Validate input from the server
  - Set reasonable default values that will not break the code (e.g. no NPEs, no objects where arrays are expected, etc...)
  - Set reasonable default values that will not appear as abnormal to the user (e.g. do not show "undefined" or "NaN", avoid showing true/false, etc...)
- Consistent
  - Present data to the user in a consistent manner across the application
  - Views stay fresh (show updated data)
  - No unnecessary server calls
  - Error messages are presented consistently
- Robust
  - Invalid data does not break the UI
  - Errors do not break the UI
  - Help is given as much as possible with errors (fill in required field, refresh the browser, contact support, etc...)
- Scalable and Maintainable
  - Use consistent, understandable patterns throughout the code to improve readability, maintainability, and scalability
  - Modularize/Compartmentalize code to be reusable and do one thing only
  - No monolith structures - break things up into components, and compose components of components
  - Follow the [Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (DRY) principle - don't write the same functionality over and over again throughout your code, put it in one place and let everything that needs it use it from there.
  - Follow the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) (SRP) - functions should do one thing only
  - Follow the [Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter) - do not chain function calls, do not return functions from functions, don't talk to strangers
  - Functions should either modify state, or return state - not both
- Testable
  - Use dependency injection as much as possible
  - Functions should be short and do one thing only - if you have more than 3 or 4 tests for a function consider breaking it up into smaller functions
- Secure
  - See OWASP ([https://www.owasp.org/index.php/Main_Page](https://www.owasp.org/index.php/Main_Page))
  - Validate user input
  - Use proper techniques for averting attacks from the client
  - Don't give too much information in error messages (don't expose your architecture through stack traces, etc...)
