---
title: "Angular Elements - Introduction"
slug: 2019-10-06-angular-elements-introduction
description: "Introduction to Angular Elements"
---
This series is going to cover how to use [Angular Elements](https://angular.io/guide/elements).

Starting with basic topics, much like the [official documentation](https://angular.io/guide/elements), and going to more advanced ones, like routing and micro front-ends.

## Web Components

[Micro front-end](https://www.thoughtworks.com/radar/techniques/micro-frontends) is a hot topic nowadays, but it is still not so mature.

One (and most common) way to accomplish that is using [web components](https://www.webcomponents.org/introduction), more specifically [Custom Elements](https://html.spec.whatwg.org/multipage/custom-elements.html).

Although [ever-green browsers](https://caniuse.com/#feat=custom-elementsv1) have support for Custom Elements, sometimes we need to develop for older browsers.

There are already [polyfills](https://www.webcomponents.org/polyfills) to address this problem, but we may face another problems like routing, state management, caching, and so on.

## Angular Elements

Like any other development trend, frameworks and libraries are trying to solve all of that for us and making our lifes easier.

Obviously, what we are going to talk about in this series is the work Angular team is doing, [Angular Elements](https://angular.io/guide/elements).

Angular Elements basically works like a bridge between the browser APIs and the [so many features provided by Angular itself](https://angular.io/features).

## How it works

When an Angular Element component is placed on a page, the browser creates an instance and adds it to the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

After the element is instantiated, Angular takes control and provides its content, data binding and change detection through [Angular Template Syntax](https://angular.io/guide/template-syntax#binding-syntax-an-overview).

The image below illustrates that:

![Element Instantiation](/blog/angular-elements/element-instantiation.png)

## Conclusion

Using Angular Elements, we can create our own Custom Elements, which behaves just like native elements.

Here, in this first article, I shared a quick introduction, also giving some articles and documentations about the topic.

The next articles will be more code detailed, explaining how to implement it.

If you have any question or concern, just drop a comment. Thanks!
