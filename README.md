# SaTodoListFrontEnd

## Deployed at

https://todo.benaychh.io/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

> All commands given in yarn because I like it better. `npm install -g yarn` or you can just replace most of the `yarn` commands with `npm run`

> Note: run `yarn` (or `npm install`) in the project folder to install dependencies before attempting any of the commands below.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. You must be running the [API](https://github.com/BenAychh/sa-todo-list-api) as well for this to work correctly.

You can also run `yarn dc:up` which will use [docker-compose](https://docs.docker.com/compose/) to spin up a Postgres database, the API and build a production version of the app to serve up locally. This is my preferred way of running the app when not doing active development. Navigate to `http://localhost:4201/` to view the app when spinning up using docker-compose

## Testing

Run `yarn test` to run the unit tests. I normally don't push coverage this high but on an app this simple, it didn't feel like I was over-testing

> Note prerequisite: Firefox for the e2e testing

Run `yarn e2e` to run the [TestCafe](https://github.com/DevExpress/testcafe) e2e tests. You must be serving the app on `:4200` with the API up for this to work.

Alternatively, if you have the app up from using the `yarn dc:up` command, you can run `yarn e2e:dc` to run the tests agianst the docker-compose version

I chose to write my e2e tests in TestCafe because it is an amazing replacement for selenium and was designed for SPAs in general. I also really love [cypress](https://www.cypress.io/) but that only supports Chrome so I have been slowly moving over to TestCafe. I did notice some linux resizing bugs in TestCafe so neither of them are perfect yet. That being said, I have written e2e tests in Selenium and some of it's children like Protractor and even with the bugs in TestCafe and the limitations in Cypress they are still so much better and faster than Selenium for SPAs.

## Git Hooks

The following git hooks were setup to protect the code:

### Pre-Commit

1. Prettify the files
1. Lint the files
1. Ensure everything compiles

### Pre-Push

1. Build production version of site
1. Run unit tests
1. Run e2e tests (against dev, not docker-compose)

I find these protect the code from myself by making sure that I am only pushing code that conforms to the linting/prettify/testing settings I have in place

## Thought Process

### Design

From the beginning, I wanted to be mobile friendly so I designed this from a mobile-first mind-set. The following is my initial sketch of what I wanted this to look like:

![initial sketch](https://storage.googleapis.com/sa-todo-list-pictures/initial_sketch.png)

Todo lists should be fairly simple and intuitive and I wanted this to embrace this simplicity in my design. From there, the desktop version just evolved after the mobile version was in place and was a natural extention of that mobile design.

As I was designing my todo list I realized that I was designing everything as if right-handed me was using it with my primary thumb. That felt unfair to left-handed users so I added a feature to mirror almost all of the buttons so that a left-handed user can use it as easily as I could. All positioning was done with CSS for speed.

### State Management

On bigger Angular projects, I tend to use [@ngrx](https://github.com/ngrx/platform) to manage my state but it felt like overkill for a simple todo app so I borrowed good practices from it and spun up my own state system using angular's services.

My state management is designed with the following in mind

1. Top-down/one-way data flow
1. Single source of truth
1. Immutable objects

### Top-down data flow

Top-down data flow makes it really easy for developers to reason about how something was updated. In six months, if I am ever unsure how something is changing, all I have to do is find the function that changes that thing and do a universal find - I can instantly see everything that is updating that piece of data. Angular is great for two-way data binding but the trend seems to be headed towards one-way data flow except in localized situations.

### Single source of truth

Again to help the developer, if there is a single source of truth for the various aspects of the app, then developers only need to change code inside of that single source of truth and it will propagate to everything (via top-town data flow)

### Immutable objects

Immutability makes for much more readable code and allows us to take advantage Angular's OnPush change detection. The Angular devs have done a great job using [zone.js](https://github.com/angular/zone.js/) and javascript-engine optimized code to make deep dirty checking very very fast but it still consumes resources to be constantly deep checking the state of every component being rendered.

Angular apps with hundreds of components rendered will actually notice a slowdown (not that you should be rendering hundreds of components at a time anyway) as Angular dirty checks all of them. Using OnPush change detection means that Angular abandons that dirty checking and I, as the developer, promise to send in new objects rather than updating the existing object. Angular can then compare memory addresses and not have to deep check anything. You will see this all over the app with the use of `observables$ | async` and @Input()

## Display via CSS when possible.

Angular has a bunch of great ways to add and remove elements, position elements and generally control the flow of those elements about the screen. That being said, adding and removing from the DOM will always be more expensive than letting the browser control via CSS so prefer CSS for position where possible. In this case, the left/right-hand settings are done via Grid and the hiding and showing of todo-context buttons is controlled via simple media queries and classes.

## Setup a PWA

This is pretty much free with Angular now and it really is best practices now to take advantage of it.

## More time wishlist

1. Add a due-date to the todos
1. More sorting options (incomplete-at-the-top, due-date order, alpha order?)
1. Explore offline functionality, syncing offline data to a database is a huge endevour but maybe an immutable version that stores todos in localStorage and shows an immutable version without connectivity
1. Get a proper pipeline in place, we have all of the testing and docker files for it, would be fairly easy to setup up CD
1. Swiping to complete in mobile mode
1. Setup a docker-compose file for the dev server to make it easier for other developers to start developing immediately
1. Error handling to the user, right now I am just logging but some type of toastr would be nice.
1. Make a proper icon for the site.
