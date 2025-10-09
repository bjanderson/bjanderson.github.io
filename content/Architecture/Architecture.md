---
title: Architecture
date: 2025-10-04
description:
draft: false
tags:
aliases:
cssclasses:
---

The word architecture probably brings to mind blueprints of large buildings. Architecture deals with the design and planning of complex structures.

Since software is a complex structure, it makes sense to approach its development from an architectural perspective.

[Software architecture](https://en.wikipedia.org/wiki/Software_architecture) is the pinnacle of the technical side of [software engineering](https://en.wikipedia.org/wiki/Software_engineering).

Software architecture as it relates to web development is quite broad. The oft-used title of "Full Stack Developer" hints at the broad scope that web development encompases. A true full-stack developer is, by necessity, a jack-of-all-trades/master-of-none.

Website architecture generally covers many areas of expertise, such as:

- Data storage, retrieval and transmission
- Server configuration
- Code infrastructure and layout
- Server programming languages and frameworks
- UI platforms and frameworks
- Security
- Testing
- Maintenance
- Deployment

On smaller projects you might find a few "full-stack" developers that fill more than one of these roles, but on larger projects you will typically find a person or even teams of people dedicated to each individual area.

I'm a UI (a.k.a. front-end) developer, so I will focus on architecture and engineering from that perspective, and leave the other areas to the Database Administrators, DevOps Engineers, etc... That's not to say that I don't know SQL, or how to set up a server to provide APIs. It's just that there is enough work to do on the front-end that I rarely have time to focus on becomming an expert in all of those other areas - at least to the point that I feel like I should teach anything about them.

That being said, here are some goals of UI architecture that I try to achieve:

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
  - Help with errors is given as much as possible with good error handling and error messages
  - Never leave users hanging at a dead end (e.g. have a specialized 404 page)
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
