---
title: Thinking Like An Architect
date: 2025-10-10
description:
draft: false
tags:
aliases:
cssclasses:
---

Work in progress...

Learn to think about systems as a whole.

As a learning exercise, try to implement the entire suite of IRS Tax forms as an enterprise web application.

- Go to the IRS website ([irs.gov](https://www.irs.gov/forms-instructions)).
- Look at the tax forms - those are your UI/UX mockups
- Look at the instructions - those are your application requirements
- Consider the different user personas - single, married filing jointly, etc...

Take these as your design documents and think about how you would build this application.

- Think about what [[Models]] you will need
- Think about what [[Services]] you will need
- Think about what [[Components]] you will need

Read through the documents and create a rough design of your application.
You can use pseudo code if it helps, but just try to piece together the main concepts that you will have to build and how they will tie together.

If you think this is complicated I want you to understand that this is the clearest and easiest set of requirements and design documents that you are probably ever going to see.
Developing enterprise applications is never this well thought out ahead of time, but will often rival this amount of complexity. As a software architect you will have to think ahead into the unknown and be able to anticipate these kinds of complexities while your customer/boss is figuring out what they want you to build.

When you are starting out on a new project and your boss has asked you to take the lead and start building a new system from scratch that is only going to do one simple thing, you should anaticipate that it's going to evolve into something that rivals the complexity of the US Tax Code.
Don't get frustrated when your boss starts asking you to add one-off edge cases, entirely unrelated functionality, "sometimes" operations, and seemingly superficial oddities - expect that to happen.
In fact, expect that to be how the entire system is going to be designed from now on.

Build your application so that it can absorb these kinds of requests, and still be robust, maintainable, and scalable!

And don't hold yourself to an unrealistic expectation of perfection - because none of us can do this perfectly - just know that you have a firm foundation and a well-though out plan and direction.

Become a system builder - no matter what the system is that you are building.
