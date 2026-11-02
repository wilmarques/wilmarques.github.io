---
title: "Angular Elements - Basic Implementation"
slug: 2019-11-20-angular-elements-basic-implementation
description: "Basic implementation of Angular Elements. Creating a Custom Element that interacts with a regular Angular application."
---
After the [explanation of the concepts behind Angular Elements (including references)](/blog/2019-10-06-angular-elements-introduction), I'll demonstrate how to implement a simple component.

## What we'll build

We will use the [Angular CLI](https://angular.io/cli/) to create an application and convert it to Angular Elements.

We'll base it on the example from the [Angular tutorial, Tour of Heroes](https://angular.io/tutorial).

However, to simplify the process, at first we'll only build the heroes listing and addition, not the dashboard.

In this example, a regular Angular application will be responsible for adding heroes, while an Angular Element displays the listing.

An illustration of what will be built:

![Heroes list illustration](/blog/angular-elements/heroes-list-example.png)

## Environment setup

First of all, we need a properly configured environment so the process goes as expected.

> More details about environment setup can be found in the [official documentation](https://angular.io/guide/setup-local).

### Node and NPM

Node 10 is the currently recommended version, both by Angular and by the Node team itself.

A great option for installing it is using a version manager, such as [nvm](https://github.com/nvm-sh/nvm) or [nvs](https://github.com/jasongin/nvs), but the [official website](https://nodejs.org/) has installation instructions for each operating system.

The advantage of using a manager is how easy it makes updating, plus the ability to have different Node versions on the same machine.

> Node 8 is no longer recommended, mainly because it's reaching the [end of its life cycle](https://nodejs.org/en/about/releases/).

[NPM](https://www.npmjs.com/) is installed together with Node, version 6 being the [latest one](https://github.com/npm/cli/releases).

### Angular CLI

To install the Angular CLI, just run the following command on the command line:

```bash
npm install -g @angular/cli@^8
```

After the installation, run this command to verify it's working correctly:

```bash
ng version
```

Command output:

![ng version command output](/blog/angular-elements/ng-version-example.png)

## Creating the project

### Workspace

The Angular CLI allows creating multiple projects inside a single [workspace](https://angular.io/guide/glossary#workspace), simplifying the creation of [monorepos](https://www.atlassian.com/git/tutorials/monorepos).

To take advantage of this feature, we'll first create an empty workspace (with no projects) using the [`ng new`](https://angular.io/cli/new) command:

```bash
ng new ng-elements --createApplication=false
```

### Initial application

After the workspace is created, we'll enter it and add a simple application with the following:

```bash
cd ng-elements
ng generate application heroes-creator --minimal=true --prefix=hc --routing=false --style=css
```

> In the command above, the `--minimal=true` parameter creates the application without setting up [unit tests](https://angular.io/guide/testing) and [functional tests](https://angular.io/cli/e2e).
>
> The `--prefix=hc` parameter sets _hc_ as the prefix for every component created in this application, for example `<hc-new-hero>`.
>
> `--routing=false` creates the application without [routing](https://angular.io/start/routing).
>
> And `--style=css` creates the project without a [CSS pre-processor](https://tableless.com.br/pre-processadores-usar-ou-nao-usar/).

Running the `ng generate` command will create a _projects_ folder, add the project named _heroes-creator_, and update the `angular.json` file with a configuration specific to that project.

It will also modify the `package.json` file, adding and installing the dependencies needed to run it.

On top of that, this new project will become the default for any command executed in this workspace.

### Running the application

After the application is created, we can run it with the following command:

```bash
ng serve
```

With the following result:

![ng serve result](/blog/angular-elements/ng-serve-result.png)

And with that we can open <http://localhost:4200/> in the browser and see the application running:

![Example application running](/blog/angular-elements/example-app-running.png)

## Creating heroes

### Main component

Now that we have a working (example) application, we can change it to match what we want.

All of this application's code lives in the _src_ directory inside _heroes_creator_, located in the _projects_ folder, as follows:

![Initial application directory structure](/blog/angular-elements/initial-app-structure.png)

Inside the _src_ folder, we find the _app_ folder containing the application's main component and module, `app.component.ts` and `app.module.ts`:

![Application's main component](/blog/angular-elements/initial-app-component.png)

First of all, we'll replace the contents of the `app.module.ts` file with:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

And the contents of the `app.component.ts` file with:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'hc-root',
  template: `
    <h1>My Heroes</h1>
    <hc-creator (newHero)="addHero($event)"></hc-creator>
    <ul>
      <li *ngFor="let hero of heroes">
        {{ hero }}
      </li>
    </ul>
  `,
})
export class AppComponent {

  heroes: Array<string> = [];

  addHero(newHero: string): void {
    this.heroes = [
      ...this.heroes,
      newHero,
    ];
  }

}
```

Paying attention to the code above, we can see a reference to a component that hasn't been created yet, `hc-creator`. We'll create it now using the Angular CLI commands:

```bash
ng generate component creator --inlineStyle=true --inlineTemplate=true --skipTests=true --flat=true
```

> The parameters used above make it so only one file is created, containing the template and styles instead of separate files for each.
>
> No unit tests are created either, and the file is created at the root of the project instead of inside its own folder.
>
> Example of the command result without the parameters:
>
> ![Example of the command result without the parameters](/blog/angular-elements/generate-example-without-params.png)
>
> Example with the parameters:
>
> ![Example of the command result with the parameters](/blog/angular-elements/generate-example-with-params.png)

After this component is created, change the contents of its `creator.component.ts` file to:

```ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hc-creator',
  template: `
    <div>
      <label>Hero name:
        <input #heroName />
      </label>
      <button (click)="add(heroName.value); heroName.value=''">
        add
      </button>
    </div>
  `,
  styles: [`
    button {
      background-color: #eee;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      cursor: hand;
      font-family: Arial;
    }

    button:hover {
      background-color: #cfd8dc;
    }
  `]
})
export class CreatorComponent {

  @Output() newHero = new EventEmitter<string>();

  add(heroName: string): void {
    if (heroName) {
      this.newHero.emit(heroName);
    }
  }

}
```

With that, we can run the project:

```bash
ng serve
```

And see the result in the browser:

![Result after creating the main component](/blog/angular-elements/main-component-creation-result.png)

### Heroes list

We can finally start creating the component using [Angular Elements](https://angular.io/guide/elements).

This component will receive the heroes list held by the main component as a parameter and display it as shown in the illustration at the beginning of the article.

First, let's create a new project in the current workspace, but this time we'll create a [library](https://angular.io/guide/libraries) where the component will live. Besides being a library and not an application, we set its components' prefix to _hv_ so we can tell them apart more easily during development:

```bash
ng generate library heroes-visualizer --prefix=hv
```

After running the command above, the project will be created in the _projects_ folder and the `angular.json` file will be updated with a new configuration specific to it. As we can see below:

![Folder structure after creating the visualizer project](/blog/angular-elements/structure-after-visualizer-creation.png)

The Angular CLI doesn't yet give us the option to generate libraries with a minimal configuration, like we did with the initial application. So let's delete the following unnecessary files:

- projects/heroes-visualizer/src/lib/heroes-visualizer.component.spec.ts
- projects/heroes-visualizer/src/lib/heroes-visualizer.service.ts
- projects/heroes-visualizer/src/lib/heroes-visualizer.service.spec.ts

> Since we won't be running any kind of test, we could also delete the `karma.conf.js` and `src/test.ts` files, and remove the [test execution configuration](https://angular.io/guide/workspace-config#configuring-builder-targets).
>
> But they won't get in the way, and we won't bother with them to keep the article short.

> Since I use [Ubuntu](https://ubuntu.com/), I run the following command in [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) to delete the files:
>
> `rm -rf projects/heroes-visualizer/src/lib/heroes-visualizer.service.ts projects/heroes-visualizer/src/lib/*.spec.ts`
>
> If you use another operating system, the command may differ.

After deleting those files, let's change the contents of the `public-api.ts` file in the `projects/heroes-visualizer/src/` folder to:

```ts
/*
 * Public API Surface of heroes-visualizer
 */

export * from './lib/heroes-visualizer.component';
export * from './lib/heroes-visualizer.module';
```

With that, we can use the component previously created in this library in the main application (_heroes-creator_), changing the `projects/heroes-creator/src/app/app.module.ts` file to:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreatorComponent } from './creator.component';

import { HeroesVisualizerModule } from 'heroes-visualizer';

@NgModule({
  declarations: [
    AppComponent,
    CreatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeroesVisualizerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

And the `projects/heroes-creator/src/app/app.component.ts` file to:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'hc-root',
  template: `
    <h1>My Heroes</h1>
    <hc-creator (newHero)="addHero($event)"></hc-creator>
    <ul>
      <li *ngFor="let hero of heroes">
        {{ hero }}
      </li>
    </ul>
    <hv-heroes-visualizer></hv-heroes-visualizer>
  `,
})
export class AppComponent {

  heroes: Array<string> = [];

  addHero(newHero: string): void {
    this.heroes = [
      ...this.heroes,
      newHero,
    ];
  }

}
```

So, we can run the project to check the result in the browser, but first we need to [build the library](https://angular.io/guide/creating-libraries#using-your-own-library-in-apps) with the command:

```bash
ng build heroes-visualizer
```

This way, when running the project (`ng serve`) we get the following result in the browser:

![Application example using the visualizer component](/blog/angular-elements/visualizer-app-running.png)

Now let's modify some files to move the heroes display over to the `hv-heroes-visualizer` component, and also implement a feature for removing specific heroes.

First, change the contents of the `projects/heroes-visualizer/src/lib/heroes-visualizer.component.ts` file to:

```ts
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'hv-heroes-visualizer',
  template: `
    <ul class="heroes">
      <li *ngFor="let hero of heroes">
        <span class="badge">{{hero.id}}</span>
        <span class="hero-name">{{ hero }}</span>
        <button class="delete" title="delete hero"
          (click)="delete(hero)">x</button>
      </li>
    </ul>
  `,
  styles: [`
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      position: relative;
      cursor: pointer;
      background-color: #EEE;
      margin: .5em;
      padding: .5em 0 .3em 1em;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }

    .heroes span.hero-name {
      color: #333;
      position: relative;
      display: block;
      width: 250px;
    }
    .heroes span.hero-name:hover {
      color:#607D8B;
    }

    button {
      background-color: #eee;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      cursor: hand;
      font-family: Arial;
    }
    button.delete {
      position: relative;
      left: 174px;
      top: -23px;
      background-color: gray !important;
      color: white;
    }
  `]
})
export class HeroesVisualizerComponent {

  @Input() heroes: Array<string>;

  @Output() deleteHero = new EventEmitter<string>();

  delete(heroName: string): void {
    if (heroName) {
      this.deleteHero.emit(heroName);
    }
  }

}
```

Then the `projects/heroes-visualizer/src/lib/heroes-visualizer.module.ts` file to:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesVisualizerComponent } from './heroes-visualizer.component';

@NgModule({
  declarations: [HeroesVisualizerComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [HeroesVisualizerComponent],
})
export class HeroesVisualizerModule { }
```

Then the `projects/heroes-creator/src/app/app.component.ts` file to:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'hc-root',
  template: `
    <h1>My Heroes</h1>
    <hc-creator (newHero)="addHero($event)"></hc-creator>
    <hv-heroes-visualizer [heroes]="heroes" (deleteHero)="deleteHero($event)"></hv-heroes-visualizer>
  `,
})
export class AppComponent {

  heroes: Array<string> = [];

  addHero(newHero: string): void {
    this.heroes = [
      ...this.heroes,
      newHero,
    ];
  }

  deleteHero(heroToDelete: string): void {
    this.heroes = this.heroes.filter((hero: string) => {
      return hero !== heroToDelete;
    });
  }

}
```

And the `projects/heroes-creator/src/app/app.module.ts` file to:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreatorComponent } from './creator.component';

import { HeroesVisualizerModule } from 'heroes-visualizer';

@NgModule({
  declarations: [
    AppComponent,
    CreatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeroesVisualizerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

Now we can build the library again (`ng build heroes-visualizer`) and run the main project (`ng serve`), getting the following result:

![Result after finishing the heroes listing](/blog/angular-elements/heroes-list-result.png)

## Converting the heroes list into an Angular Element

So far, we've created a main project consisting of a _regular_ Angular application and a _component library_ where the heroes list lives.

But so far, there's no Angular Elements usage in any of these projects. And that's what we'll do now, converting the `heroes-visualizer` library to Angular Elements.

First, we must add Angular Elements support to the main project, since it will be responsible for displaying the component exported as such. To do that, just run the command:

```bash
ng add @angular/elements
```

This command adds the [Custom Elements polyfill](https://github.com/WebReflection/document-register-element) and the [@angular/elements](https://www.npmjs.com/package/@angular/elements) package to the workspace.

Let's change the `projects/heroes-visualizer/src/lib/heroes-visualizer.module.ts` file to the following:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesVisualizerComponent } from './heroes-visualizer.component';

@NgModule({
  declarations: [HeroesVisualizerComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  entryComponents: [HeroesVisualizerComponent],
})
export class HeroesVisualizerModule { }
```

The change consists of moving this library's component from the `exports` list to `entryComponents`, so it's not part of the application's main compilation, since we'll be using it as an Angular Element.

Now we need to register this component as a Custom Element, using the APIs provided by the `@angular/elements` package, more specifically the [`createCustomElement`](https://angular.io/api/elements/createCustomElement) method.

This registration will happen in the application's main component, changing the `projects/heroes-creator/src/app/app.component.ts` file to the following:

```ts
import { Component, Injector, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { HeroesVisualizerComponent } from 'heroes-visualizer';

@Component({
  selector: 'hc-root',
  template: `
    <h1>My Heroes</h1>
    <hc-creator (newHero)="addHero($event)"></hc-creator>
    <hvce-heroes-visualizer [heroes]="heroes" (deleteHero)="deleteHero($event.detail)"></hvce-heroes-visualizer>
  `,
})
export class AppComponent implements OnInit {

  heroes: Array<string> = [];

  constructor(
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    const HeroesVisualizerElementDefinition = createCustomElement(
      HeroesVisualizerComponent,
      { injector: this.injector },
    );
    customElements.define('hvce-heroes-visualizer', HeroesVisualizerElementDefinition);
  }

  addHero(newHero: string): void {
    this.heroes = [
      ...this.heroes,
      newHero,
    ];
  }

  deleteHero(heroToDelete: string): void {
    this.heroes = this.heroes.filter((hero: string) => {
      return hero !== heroToDelete;
    });
  }

}
```

The change in the component above was made so we can use the `createCustomElement` function from the `@angular/elements` package to create what we call an _Element Definition_, or the _constructor_, to be used by the browser to instantiate what will now basically be a [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

When this function is called, Angular creates the bridge between the browser's native APIs and the framework's own features. This is needed so we can use features like [data binding](https://angular.io/guide/template-syntax), for example.

With this _Element Definition_ converted and returned by Angular, we can use the browser's native [`customElements.define`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) method so the element is properly registered and available to be used in the application.

This method takes 3 parameters: the element name, the _Element Definition_ (or constructor), and an options object. But in this example only the first two were needed.

In the line containing `customElements.define('hvce-heroes-visualizer', HeroesVisualizerElementDefinition);` we can see these two parameters being passed to the `define` method.

We can also see the name given is `hvce-heroes-visualizer` instead of the one we were using before, `hv-heroes-visualizer`. That's because at this point the name defined in the Angular component won't be used, and we can choose any other for the browser to use in the Custom Element definition. We could have used the same name, but for illustration purposes we used a different one.

Another difference from a _regular_ Angular component is how we receive the values of the events exposed through [`Output`s](https://angular.io/api/core/Output).

In a _regular_ component we received the value by simply reading the `$event` object:

```html
<element (event)="method($event)"></element>
```

With an Angular Element we must use the event's [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) property, since we're now dealing directly with [`Custom Event`s](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) that must follow the [specification followed by browsers](https://dom.spec.whatwg.org/#dom-customeventinit-detail). So it becomes:

```html
<element (event)="method($event.detail)"></element>
```

Even after these changes, running the application gives us the following error:

![Error when binding to Custom Elements](/blog/angular-elements/missing-custom-element-schema-error.png)

This happens because Angular is trying to find that element's property as if it were a _regular_ component, but it must be treated as a Custom Element. And for that to happen as expected, we must add the `CUSTOM_ELEMENTS_SCHEMA` `schema` to the application's main module.

So, let's change the contents of the `projects/heroes-creator/src/app/app.module.ts` file to:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreatorComponent } from './creator.component';

import { HeroesVisualizerModule } from 'heroes-visualizer';

@NgModule({
  declarations: [
    AppComponent,
    CreatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeroesVisualizerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
```

With that fixed, we can build the library again (`ng build heroes-visualizer`) and run the application normally (`ng serve`) to see the result:

![Application result with heroes listing using Angular Elements](/blog/angular-elements/heroes-list-custom-element-result.png)

## Next steps

This was a _standard_ Angular Elements implementation, with no customization and not going much further than what's presented directly in the Angular documentation.

So, as you may have noticed, even though the component can be considered a Custom Element, it still needs to be compiled and shipped together with the application.

But we'll address that subject in the next articles!

Other than that, feel free to comment and contribute positively!
