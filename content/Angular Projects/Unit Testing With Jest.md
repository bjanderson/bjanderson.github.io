---
title: Unit Testing With Jest
date: 2025-10-04
description:
draft: false
tags:
aliases:
cssclasses:
---

## Testing the component and injecting dependencies

So, we've replaced Karma with Jest and we're one step further along the path to speeding up our unit tests. But a framework alone can't make all the difference. It's up to you to write tests that will run as fast as possible. Why? Because if your tests take forever to run, you will run them less often.

Before we get into the details of how to squeeze every ounce of performance out of our unit tests, we need to take a step back and remember some things about the bigger picture. First of all, Angular is a JavaScript framework. We may be using TypeScript to write our code, but TypeScript is just a layer on top of JavaScript too. At the heart of it all is JavaScript, and because of that, we can use JavaScript in it's rawest form to get our tests running as fast as possible.

What do I mean by using JavaScript in its rawest form? Well, think of a component that depends on a service. That service gets injected into the component by Angular's dependency injection mechanism, which is fantastic for the app, but not for the tests. Why? Well, that service may have dependencies, and those dependencies may have dependencies, and wiring all of that up ourselves would be a nightmare in our application code, so, thank you Angular for doing all that work for us in the application code, but we don't want it in our tests.

We don't want all of those dependencies to be wired up in our tests. We want to mock all of them. Well, we actually only want to mock the things we are using, and we want to be able to mock them in a way that suits our tests. That's what Angular's [TestBed](https://angular.io/api/core/testing/TestBed) does, but the only problem is that the TestBed does a lot of processing while it's going through the motions of wiring up your mock dependencies for you.

What if we just treated those dependencies as plain old JavaScript objects. What if we dropped the TypeScript from our tests and made all of our dependencies be of type any. Then we could pass in the bare minimum of code (raw JavaScript) to each of our tests, that requres zero wire-up, and we can easily shape it however we want on a test-by-test basis.

I do not use Angular's built in TestBed or any of their testing framework for my unit tests. I find that they add unnecessary complexity, and are slower than if you just treat your tests like plain JavaScript. I also use the "any" type liberally in my tests because Type checking is not important to me in the tests. I sometimes want to test things using the wrong types, and I don't want to have to hack around things like private variables since JavaScript does not recognize private variables anyways.

The only reason you would want to use the Angular TestBed in your tests is if you were trying to read the component html or css in your unit tests. In my opinion those kind of things are better left to end-to-end tests, rather than your unit tests. To me unit tests are for making sure you JavaScript works as expected. We will see later how Cypress is better suited to making sure that all the UI pieces are stitched together correctly.

## Starting From App

OK, enough chit-chat. Let's get into some examples. We'll start with the first test you get when you create a new angular project.

`src/app/app.comonent.spec.ts`

```typescript
import { TestBed, async } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { AppComponent } from "./app.component"

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents()
  }))

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'test-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app.title).toEqual("test-app")
  })

  it("should render title in a h1 tag", () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector("h1").textContent).toContain("Welcome to test-app!")
  })
})
```

When you create a new Angular project using the angular-cli it generates an app.component.ts and an app.comonent.spec.ts. By default, app.comonent.spec.ts uses the TestBed for it's tests. And it needs to use it because it is testing things in the HTML. If you want to test things in your html, then you will need to use it too. But if you're just testing your JavaScript, then you really don't need all the extra overhead.

Now, I'm not trying to come down hard on TestBed. It's a tool that has its uses. I'm just trying to make the point that it's not an absolute requirement for our tests, and that it might be doing more than we want it to most of the time. To see what I mean, take a look at the [TestBed source code on github](https://github.com/angular/angular/blob/master/packages/core/testing/src/test_bed.ts). Specifically, follow the logic of the two functions that the default TestBed setup calls (configureTestingModule and compileComponents), and then compare that to the code I'm suggesting we use instead. I will let you be the judge of what runs faster.

One of the first things I do when I create a new Angular project is change app.component.spec.ts to look like this.

`src/app/app.comonent.spec.ts`

```typescript
import { AppComponent } from "./app.component"

let component: any
function init(): void {
  component = new AppComponent()
}

describe("AppComponent", () => {
  describe("constructor", () => {
    beforeEach(() => {
      init()
    })

    it("should create the app", () => {
      expect(component).toBeDefined()
    })

    it("should set the component.title", () => {
      expect(component.title).toEqual("my-app")
    })
  })
})
```

There's an init function that creates a new instance of my component before each test run, which creates a new instance of the component directly, without worrying about a bunch of wire-up that I'm not going to use anyways.

Then I verify that the component actually gets created, and I can simply and easily access any properties of the component in my tests.

There's no magic, there's only the bare minimum amount of code needed for the tests to work. And if you remove any type defintions (such as "any" and "void") you could run these same exact tests as regular JavaScript without even needing a TypeScript transpiler (assuming AppComponent is already transpiled).

That's as fast and simple as it gets!

## Testing The Component

As you can see from the above example, testing properties on the component is as straight forward as it gets. If the component has a property, you can reference it directly in your tests.

But what about functions? Well, if you think about your component as a JavaScript object, functions are just properties on the object, except they do things instead of just sit there. The thing to keep in mind when it comes to testing functions is to always limit the scope of your tests to just the logic in the function under test. In other words, don't test other functions as part of your test for the function under test. Give those functions their own tests.

Let's take a look at another simple example, just to visualize the concept.

Here's our app component that we are going to test.

`app.component.ts`

```typescript
import { Component } from "@angular/core"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "test-app"

  setTitle(title: string): void {
    this.title = title
  }
}
```

And here's our updated test with a section dedicated to the new function we added.

`app.component.spec.ts`

```typescript
import { AppComponent } from "./app.component"

let component
function init() {
  component = new AppComponent()
}

describe("AppComponent", () => {
  describe("constructor", () => {
    beforeEach(() => {
      init()
    })

    it("should create the app", () => {
      expect(component).toBeDefined()
    })

    it("should set the component.title", () => {
      expect(component.title).toEqual("my-app")
    })
  })

  describe("setTitle()", () => {
    beforeEach(() => {
      init()
    })

    it("sets the title", () => {
      const newTitle = "test title"
      component.setTitle(newTitle)
      expect(component.title).toEqual(newTitle)
    })
  })
})
```

Again, nothing too complicated going on here - and that's the beauty of it!

You might have noticed that I have two beforeEach blocks for the two child describe blocks - (constructor and setTitle). You might think that you can cut down on the code by consolidating those beforeEach blocks into one under the higher-level describe block (AppComponent). You wouldn't be wrong, but the reason I keep those beforeEach blocks where they are is because, when the tests get more complicated, its easier to manage what gets set up for each specific describe block, than to try to manage all that in the top-level beforeEach. In this case I could consolidate those two, but I've become accustomed to the convention of keeping a beforeEach in each low-level describe block.

## Functions That Call Other Functions

If you are writing small, SRP functions, like you should be, then you will inevitably have functions that call other functions within your component. And, as I mentioned above, you should limit the scope of your tests to the function that is currently under test. By setting up our tests the way we have been - treating everything as JavaScript objects - it's super easy to mock out the other functions in our component when we are not testing them directly.

Just for the purposes of this example, let's say we have an ngOnInit function that calls the setTitle function when it runs. Like I said before, we only want to test what's in the scope of the ngOnInit function, and not the result of the setTitle function. Here's how that would look.

Here's the updated version of our component:

`app.component.ts`

```typescript
import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "test-app"

  ngOnInit(): void {
    this.setTitle("Hello App")
  }

  setTitle(title: string): void {
    this.title = title
  }
}
```

And here's the updated version of our test:

```typescript
import { AppComponent } from './app.component';

let component;
function init() {
  component = new AppComponent();
}

describe('AppComponent', () => {

  describe('constructor', () => {
    ...
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      init();
      component.setTitle = () => undefined;
    });

    it('calls setTitle()', () => {
      const spy = spyOn(component, 'setTitle').and.callThrough();
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith('Hello App');
    });
  });

  describe('setTitle()', () => {
    ...
  });
});
```

You can see that the beforeEach for our ngOnInit section is now doing something unique for that section. I'm using it to override the definition of setTitle on the component, to turn it into a no-op function. If I did that in a higher-level beforeEach, then I wouldn't be able to test my setTitle function in its describe block since it would always be a no-op funciton. And I'm setting it to a no-op function beacuse I don't care about what the setTitle function does in my ngOnInit tests - all I care about is if my ngOnInit function calls the setTitle function with the correct parameters. Whether the setTitle function works correctly or not should be tested in the setTitle section of the tests.

## Injecting Dependencies

Admittedly, there's nothing complicated going on in our component at this point, so let's take all of this to the next level and inject a service into our component.

The first thing most app components are going to do is probably request the user information from an api, so let's do that.

Now our component is starting to look a little more interesting:

`app.component.ts`

```typescript
import { Component, OnInit } from "@angular/core"
import { take } from "rxjs/operators"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "test-app"

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((userInfo: UserInfo) => {
      this.setTitle(`Hello ${userInfo.userName}`)
    })
  }

  setTitle(title: string): void {
    this.title = title
  }
}
```

Normally, I would break all the code in the ngOnInit function into multiple functions (SRP), but I'm leaving it all there so that I don't complicate my explanation of what's going on here.

And our test file looks like this:

`app.component.spec.ts`

```typescript
import { of } from 'rxjs';
import { AppComponent } from './app.component';

const userInfo = { userName: 'test user name' };
const userService: any = {
  getUserInfo: () => of(userInfo),
};

let component;
function init() {
  component = new AppComponent(userService);
}

describe('AppComponent', () => {

  describe('constructor', () => {
    ...
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      init();
      component.setTitle = () => undefined;
    });

    it('calls userService.getUserInfo()', () => {
      const spy = spyOn(component.userService, 'getUserInfo').and.callThrough();
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });

    it('calls setTitle()', () => {
      const spy = spyOn(component, 'setTitle').and.callThrough();
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith(`Hello ${userInfo.userName}`);
    });
  });

  describe('setTitle()', () => {
    ...
  });
});
```

Can you spot the dependency injection here?

Take a look at the top of the test file. There's a mock of the userService that only defines the function that our component is using from that service. Since that function returns an observable we are using the RXJS `of` operator, which creates an observable that returns whatever value you give it. An added bonus of the RXJS `of` operator is that it runs synchronously so you can test whatever is in your subscribe function without having to worry about asynchronicity.

Our component constructor takes the UserService in as a parameter, so our test passes our mocked UserService object in as a parameter. Our component only uses one function from the UserService, so our mock only defines that function. And we don't care if the UserService.getUserInfo function works correctly in our component tests because we know that the UserService will cover all of that in its own tests.

And taking this one step further, what if I wanted to overwrite the mocked UserService function in my test so that I can test what happens when the service returns different values. Well, here's an example of that:

`app.component.spec.ts`

```typescript
describe('ngOnInit()', () => {
  ...
  it('calls setTitle() with other mock data', () => {
    const info = {userName: 'a different test user name'};
    component.userService = { getUserInfo: () => of(info) };
    const spy = spyOn(component, 'setTitle').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(`Hello ${info.userName}`);
  });
```

Notice that I'm referencing the component.userService in this test, which allows me to change my mocked userService for that individual test, and that change will be overwritten and set back to it's original value when the beforeEach function calls init and news up my component again. I could also mock that service in my beforeEach block similar to how I mocked the setTitle function if I wanted to change it for all the tests in a given section.

## Conclusion

Well, I hope this has given you a new insight into testing your Angular applications, and hopefully this will help you write tests that literally run in the blink of an eye. Like I said at the beginning, I'm not saying that Angular's TestBed is a bad thing. I'm simply saying that there are much more efficient alternatives available to you if you want them. It's important for us to remember that, at the end of the day, we are working with JavaScript - no matter how many layers it's burried under.
