---
title: "TypeScript vs Dart - Variable Declaration"
slug: 2021-06-19-typescript-vs-dart-variable-declaration
description: "Comparison between variable declaration types in TypeScript and Dart"
coverImage: /blog/typescript-vs-dart/ts-vs-dart-cover.png
---
TypeScript, [being just a _layer_ on top of JavaScript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#a-typed-superset-of-javascript), has the same three ways of declaring variables:

- `var`
- `let`
- `const`

Dart also has three forms, but slightly different ones:

- `var`
- `final`
- `const`

Let's look at these differences.

> All examples can be run in the [TypeScript Playground, for TypeScript](https://www.typescriptlang.org/play), and in [DartPad, for Dart](https://dartpad.dartlang.org/?null_safety=true).

## Variable declaration in TypeScript

`let` and `const` are relatively new forms, introduced to solve some problems inherent to `var`. But let's start with some `var` characteristics to understand why `let` and `const` were created.

### `var` confusions in TypeScript

The first _confusing_ characteristic of `var` is the possibility of declaring the same variable multiple times. Or, in other words, declaring multiple variables with the same name:

```ts
var x = 10;
var x = 15; // Variable `x` was created again
```

On top of that, we can assign a value to a variable even before it has been declared:

```ts
x = 15; // Assigning a value to variable `x` before its declaration
var x; // Variable declaration
```

> Fun fact: this characteristic is tied to how [Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) works in JavaScript.

Usually, the biggest point of confusion concerns the scope of a variable declared with `var`. By scope we mean which part of the code the variable can be used in. In many languages the scope is the block (for example, an `if`) where the variable was declared, but `var` in TypeScript is function-scoped.

For example, we can declare a variable inside an `if` and use it outside:

```ts
if (false) {
  var x = 15; // Declaring variable inside the `if`
}
x = 10; // Accessing variable
```

This happens because, as said above, `var` is _function-scoped_ and not _block-scoped_. To make it clearer, let's use the same code above wrapped in a function:

```ts
function myFunction(): number {
  if (false) {
    var x = 15; // Declaring variable inside the `if`
  }
  x = 10; // Variable can be accessed anywhere in the `myFunction` function
  return x;
}
```

As we could see, `var` in TypeScript has a few confusing points that, if not well understood, can bring problems to the code. It's not uncommon to introduce bugs into a program because of this. On top of that, developers coming from other languages don't expect these behaviors.

In an attempt to solve these problems, `let` and `const` were introduced.

### `let` to the rescue

Basically, `let` works like `var` but with the problems fixed. Because of that, we should generally stop using `var` and use only `let` and `const`. Let's recap the points raised earlier and see how `let` behaves.

Let's start by declaring the same variable twice:

```ts
let x = 10;
let x = 15; // Error: Cannot redeclare block-scoped variable 'x'
```

When running this code, the TypeScript compiler reports that the variable had already been declared before.

Next point, assigning a value to a variable before its declaration:

```ts
x = 15; // Error: Block-scoped variable 'x' used before its declaration
let x;
```

Once again the compiler shows an error, pointing out the variable was used before its declaration.

Now one of the biggest points of confusion with `var`: function-based scope. What happens if we take the same code used before and swap `var` for `let`?

```ts
function myFunction(): number {
  if (false) {
    let x = 15;
  }
  x = 10; // Error: Cannot find name 'x'
  return x;
}
```

Here the scope difference between `let` and `var` is made clear. In the example above, the variable `x` was declared inside a code block (`if`), and is only available in that block. That's because `let` is _block-scoped_, not function-scoped.

### Life is not always a `const`

Just like `let`, `const` behaves the same way explained in the previous section. It's also block-scoped, can't be redeclared, and can't be used before its declaration. The difference between the two is in assignment: with `const` it can only be done once.

For example, with `let` we can change a variable's value indefinitely:

```ts
let x = 10; // Initialized with 10
x = 15; // Changing to 15
```

With `const`, that's no longer possible. Once created, its value can't be changed:

```ts
const x = 10;
x = 15; // Error: Cannot assign to 'x' because it is a constant
```

It's important to note that even though assignment can only happen once, `const` doesn't make the value [immutable](https://segredo.dev/o-que-e-imutabilidade/). If the variable's value is an object, its properties can still be changed:

```ts
const person = {
  age: 23,
};
person.age = 30; // It's still possible to change a property's value
```

A good programming practice is not reusing the same variable for different meanings, which makes code more readable. `const` helps reinforce that concept by not allowing that reuse. With that in mind, we can always code with `const`, using `let` only where it's really needed.

## Variable declaration in Dart

Now that we understand variable declaration in TypeScript, let's move on to Dart.

### Enter `var`

Just like we did in the [section where we covered `let` in TypeScript](#let-to-the-rescue), we'll run the tests demonstrating the inconsistencies of `var` in TypeScript. Only now we'll run them in Dart.

Declaring the same variable twice:

```dart
var x = 10;
var x = 15; // Error: The name 'x' is already defined
```

Just like `let` in TypeScript, the Dart compiler doesn't allow a variable to be declared more than once.

Now assigning a value to a variable before its declaration:

```dart
x = 15; // Error: Local variable 'x' can't be referenced before it is declared
var x;
```

Once again the compiler shows an error, pointing out the variable was used before its declaration.

Lastly, the test related to a variable's scope:

```dart
int myFunction() {
  if (false) {
    var x = 15;
  }
  x = 10; // Error: Undefined name 'x'
  return x;
}
```

With these tests, we can see that `var` in Dart behaves like `let` in TypeScript. Now let's look at `final`.

### Is every `final` a happy one?

Dart has two forms of _constant_ variables: `final` and `const`. Starting with the first, `final` in Dart is similar to `const` in TypeScript.

That means the variable can only have a value assigned once:

```ts
final x = 10;
x = 15; // Error: The final variable 'x' can only be set once
```

Just like `const` in TypeScript, `final` in Dart doesn't make the variable's value immutable. It can still be changed if it's some complex type:

```dart
final person = {
  'age': 23,
};
person['age'] = 30;
```

### Final `const`iderations

We're left with the last way of declaring variables in Dart. `const` is yet another way to create single-assignment variables. In fact, `const` is implicitly also `final`. But there's a difference.

`const` makes the value immutable at _compile time_. With that, the compiler guarantees that the value of a variable defined with `const` is never changed.

To make it clearer, when we write the same previous example with `const`, we don't get any error while typing:

```dart
const person = {
  'age': 23,
};
person['age'] = 30;
```

But when we run it, the compiler throws an error: _Unsupported operation: Cannot modify unmodifiable Map_. Showing us we tried to change a value that can't be modified.

So we can say that `const` in Dart guarantees [Immutability](https://segredo.dev/o-que-e-imutabilidade/)!

> To learn more about these concepts, check the [Dart Language Tour](https://dart.dev/guides/language/language-tour#variables).

## Conclusion

To wrap up, we can summarize:

- Never use `var` in TypeScript
- `var` in Dart equals `let` in TypeScript
- `final` in Dart equals `const` in TypeScript
- `const` in Dart guarantees compile-time immutability

See you in the next article!
