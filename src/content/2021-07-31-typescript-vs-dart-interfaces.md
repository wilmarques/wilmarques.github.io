---
title: "TypeScript vs Dart - Interfaces"
slug: 2021-07-31-typescript-vs-dart-interfaces
description: "Differences in how interfaces are used in TypeScript and Dart"
coverImage: /blog/typescript-vs-dart/ts-vs-dart-cover.png
---
In this article we'll briefly cover how interfaces are used in TypeScript and how Dart provides the same functionality.

- [TypeScript](#typescript)
- [Dart](#dart)
- [Bonus](#bonus)
- [Conclusion](#conclusion)

## TypeScript

Like many languages, TypeScript supports [interfaces](https://en.wikipedia.org/wiki/Interface_(object-oriented_programming)). A feature widely used to create contracts where there's communication between two or more _software components_.

To illustrate, let's create a function in TypeScript. This function will receive a first name and a last name, and will return the _full name_:

```ts
function joinNames(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}
const fullName = joinNames('Wiley', 'Marques');
console.log(fullName); // 'Wiley Marques'
```

> [Open in TypeScript Playground](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAKzjMA5AhgWwKYDOAFMDAE4FTb4BcilZ6A5gDSIA2Wl1edDzASj5RGYJogDeAKESIyeKCDJIABgBIJpClVx4Avog2duuvSoDcUvVIgJKiUO3Y9EAXhRpMu4gHIA6jDseACePmw+ALJYZACOIIQ+Apa2YARwQQB07HBMJCBOPElAA)

Now, to illustrate the use of an interface, let's change how the function receives its parameters. Instead of receiving `firstName` and `lastName`, it will receive an object containing those two properties.

For that, we'll create the `Person` interface with those properties. We'll change the function to receive an object whose type is the interface. And we'll change how the function is called, passing an object matching the interface:

```ts
interface Person {
  firstName: string;
  lastName: string;
}

function joinNames(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

const fullName = joinNames({
  firstName: 'Wiley',
  lastName: 'Marques',
});

console.log(fullName); // 'Wiley Marques'
```

> [Open in TypeScript Playground](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAcnALYQBcyFUoA5gNxHIA2cF1dRszacAvgQIwAriARhgOZACssoARAwAKAA6YcjdORwBKIWBYhW+LlAhgpUXAAMAJHl1GQAOlLkqtCFFkNw9sb15+ANEnMQkEHAoSKW5udWQAXmVVEHUtQmJfSMFkAHIAdWBuCABPEoAaLgj-YpKAWTgoAEcpDXqCUWNOAniQbCqvbixWTWkU9UGCIA)

We created the interface and made the `joinNames` function receive it as a parameter. But interfaces aren't used only to define function signatures. They're also used to define a contract to be followed by classes in a piece of software. So let's modify the example above to demonstrate that use.

We'll create a class named `Wiley` to build an object. Since the object will be used as a parameter for the `joinNames` function, it must respect the `Person` _contract_ (or interface). Therefore we'll have to _implement_ the `Person` interface in the `Wiley` class and define properties matching the ones expected by the interface. Resulting in the following code:

```ts
interface Person {
  firstName: string;
  lastName: string;
}

class Wiley implements Person { // Implementing the `Person` interface

  // Defining the properties required by the interface
  public firstName: string = 'Wiley';
  public lastName: string = 'Marques';

  // We can add any other property
  public hasChildren: boolean = true;
}

function joinNames(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

const wiley = new Wiley(); // Creating a `Wiley` object
const fullName = joinNames(wiley); // Passing `wiley` to the function

console.log(fullName);
```

> [Open in TypeScript Playground](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAcnALYQBcyFUoA5gNxHIA2cF1dRszacAvgQIJeGDMgDqwbhACeyYDQAOSuuFnpyOfMgD0x5AElN2iODggAJlmRw14aPCTIABvuwgvEsSmyAAiEKQgoI7OshpQWHHAEPZw9hCyUBAAjgCu0MApsiAuoJCwiBBcGjkARtzACCRk-LQMTGAsIKzIALzIAOQKSsr9nMTVdQ08fFStQh1svQMAsnBQuemjgSZmqFhpNFiyqQ3AOGvIuXDcG1DIWDkdLnEJLMmpleO19Y0AFnwAYV+insmRAjBqWCwSjsSw6eTEEhgORACDAZ1wACssKABOkABQaTA4Ri+HAASnmnW6hGImTAOSguC8ABI8ESDCAAHSkcizOiiZBsjl+LnSfkQUReRGSHAUZAAd0UKiWIAgCvkyuU+PJ7B2yABLDs0RyNHuNUxEDATi8QxUAQQcrAJBy3G4eKW2NxrQw+KVw11+tQfAwxpt-vtyA0axcLmRIAA5wBjrASR0gbBKMVYVj45FuvG6oA)

As we can see, even though the `wiley` object is of type `Wiley`, we can use it as a parameter for the `joinNames` function. That's because the `Wiley` class implements the `Person` interface, and the `joinNames` function is prepared to receive any object that implements `Person`.

## Dart

Now let's see how Dart works in this regard.

Dart has extensive documentation about all the features available in the language. That documentation can be seen at: [A tour of the Dart language](https://dart.dev/guides/language/language-tour). There we can see that Dart has no explicit way of creating interfaces. The alternative offered by the language is the use of [_Abstract Classes_](https://dart.dev/guides/language/language-tour#abstract-classes).

In Dart, there's a concept called [_Implicit Interface_](https://dart.dev/guides/language/language-tour#implicit-interfaces). Basically, every class is also implicitly an interface! So any class (abstract or not) can be _implemented_ by another when needed.

Moving to the code and following the documentation's recommendation, the abstract `Person` class would look like this:

```dart
abstract class Person {
  String get firstName;
  String get lastName;
}
```

> One thing to note here is that, besides using an abstract class, a [`getter`](https://dart.dev/guides/language/language-tour#getters-and-setters) was needed instead of a simple property.

Now, continuing the exercise, let's convert the last example from the previous section to Dart. Resulting in the following code:

```dart
abstract class Person {
  String get firstName;
  String get lastName;
}

class Wiley implements Person { // `Wiley` class implementing `Person` class
  String firstName = 'Wiley';
  String lastName = 'Marques';
  bool hasChildren = true;
}

String joinNames(Person person) {
  return '${person.firstName} ${person.lastName}';
}

void main() {
  final wiley = new Wiley();
  final fullName = joinNames(wiley);
  print(fullName);
}
```

> [Open in DartPad](https://dartpad.dev/94c64482c553e8a769e9154b77eff90a)

And so we have an _Abstract Class_ being used as a _contract definition_.

## Bonus

Let's add an interesting fact. In TypeScript, classes also have implicit interfaces! That means it's also possible to define an abstract class and use it as a contract, similar to what we did in Dart.

In code, the abstract class would look like this:

```ts
abstract class Person {
  abstract get firstName(): string;
  abstract get lastName(): string;
}
```

And the whole example would be:

```ts
abstract class Person {
  abstract get firstName(): string;
  abstract get lastName(): string;
}

class Wiley implements Person {
  public firstName: string = 'Wiley';
  public lastName: string = 'Marques';
  public hasChildren: boolean = true;
}

function joinNames(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

const wiley = new Wiley();
const fullName = joinNames(wiley);

console.log(fullName);
```

> [Open in TypeScript Playground](https://www.typescriptlang.org/play?#code/IYIwzgLgTsDGEAJYBthjAgCgUymA9gHYIDeAUAgqJDPAgObaIBmAlnhAHLAC22AFAEoAXAhqtC9ANwUq4aHESNEqSNz5DR4yTIC+ZMijQYA6q2TYAnglY8ADhb6EIGHHiKlZdgK4hkrWAQ2DnVsLWgJegQAXgQAcjMLSziZSh8-AIRVLl4wsQjJGPiAWWAoAEdvbDAUr19-QIALNABhRvMAEyhsQlEQfHwLYGJY6Cq9A2ZvQnhWDwArfAlQsH47XAJerA2iEXyoSM9KbohvKGIAAwASEnX3QgA6YLVc3QQbu82H7NDdC4nDERIAgAO7mKxFQjYEEIRJWIQyWBAljeZDIUJFRbLXKrMFJQQyQGEAgWb74ej8KZo0IEoA)

In other words, TypeScript supports both forms!

<h2 id="conclusion">Conclusion</h2>

We've seen how to implement interfaces in TypeScript and what alternative Dart proposes. We've also seen how TypeScript offers the same support for implicit interfaces found in Dart.

In the next articles, we'll see other comparisons. Thank you. And see you soon!
