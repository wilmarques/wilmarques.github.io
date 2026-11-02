---
title: "TypeScript vs Dart - Iterable Collections"
slug: 2021-10-16-typescript-vs-dart-iterable-collections
description: "Differences between iterable collections in TypeScript and Dart"
coverImage: /blog/typescript-vs-dart/ts-vs-dart-cover.png
---
- [What are iterable collections](#what-are-iterable-collections)
- [Creating a list](#creating-a-list)
- [Adding items](#adding-items)
- [Getting specific items](#getting-specific-items)
- [Removing items](#removing-items)
- [Iterating sequentially over the elements](#iterating-sequentially-over-the-elements)
- [Checking whether a specific item exists](#checking-whether-a-specific-item-exists)
- [Filtering items](#filtering-items)
- [Conclusion](#conclusion)
- [References](#references)

## What are iterable collections

Collections are, in short, a representation of a group of objects. An iterable collection is a type of collection where you can iterate over the elements. In other words, they're collections where we can *navigate* their elements.

Both languages (Dart and TypeScript) have native implementations for creating iterable collections. In both, this type is called `Iterable`. Each one obviously has a different implementation, but they share the same goal and similar functions.

The most common types of iterable collections are: `Lists` (or `Arrays`), `Maps`, and `Sets`. In this article, we'll look specifically at `Lists` in Dart and `Arrays` in TypeScript, since they're the most basic type of collection. The other iterables will be covered in future articles.

## Creating a list

*List* is the name we'll use when talking about `Arrays` or `Lists` throughout this article.

Let's start by creating an empty list (one with no elements) in each language.

In Dart:

```dart
final emptyList = [];
```

In TypeScript:

```typescript
const emptyList = [];
```

As we can see, the syntax is practically the same. Now let's create a list already initialized with some numbers.

In Dart:

```dart
final list = [1, 2, 3, 4, 5];
```

In TypeScript:

```typescript
const list = [1, 2, 3, 4, 5];
```

Once again the syntax is practically the same. Both languages do have other ways of creating lists, but this syntax is, besides being very simple, the most used one and covers most scenarios.

## Adding items

With our lists of numbers created, let's add new elements.

In Dart:

```dart
final list = [1, 2, 3, 4, 5];
list.add(6);
```

In TypeScript:

```typescript
const list = [1, 2, 3, 4, 5];
list.push(6);
```

In this example we can already see a difference between the languages. In Dart, we use a list's `add` method to insert new elements. In TypeScript, we use the `push` method.

## Getting specific items

It's very common to need specific items from a list — the third one, for example. Once again, the implementation in both languages is quite similar. We just need to provide the *index* (or position) of the item when referencing the list.

In Dart:

```dart
final list = [1, 2, 3, 4, 5];
final thirdItem = list[2]; // 3
```

In TypeScript:

```typescript
const list = [1, 2, 3, 4, 5];
const thirdItem = list[2]; // 3
```

With this we can get any item from the list, making it possible, for example, to get the first item.

```dart
final list = [1, 2, 3, 4, 5];
final firstItem = list[0]; // 1
```

In TypeScript:

```typescript
const numbers = [1, 2, 3, 4, 5];
const firstItem = numbers[0]; // 1
```

However, getting the last item in TypeScript requires knowing the list's size and subtracting 1 (one). The subtraction is needed because indexing starts at 0. For example, in a list of 5 elements the last item would be at index 4.

With that, the logic in TypeScript would be:

```typescript
const list = [1, 2, 3, 4, 5];
const listLength = list.length;
const lastItemIndex = listLength - 1;
const lastItem = list[lastItemIndex]; // 5
```

In Dart, we have the advantage of the language itself providing a simpler solution. Every list has a property called `first` and another called `last`. They return the first and the last item, respectively.

With that convenience, the logic for getting the last item would be:

```dart
final list = [1, 2, 3, 4, 5];
final lastItem = list.last; // 5
```

Getting the first item is equally simple:

```dart
final list = [1, 2, 3, 4, 5];
final firstItem = list.first; // 1
```

## Removing items

Removing items from lists is possible in both languages. However, Dart has one more advantage over TypeScript here. That's because TypeScript doesn't provide a method specifically for removing one item, but rather a method for removing one or more items.

In TypeScript we have the `splice` method. This method can take (among other things) two parameters for its execution. The first is the index of the element to be removed and the second refers to how many elements will be removed starting from the one referenced by the index.

With that, when we want to remove the item at position 2 of the list we must provide not only the value `2` as the first parameter, but also the value `1` in the second parameter. Example:

```typescript
const list = [1, 2, 3, 4, 5];
list.splice(2, 1);
```

In Dart, we just use the `removeAt` method passing the index of the item to be removed:

```dart
final list = [1, 2, 3, 4, 5];
list.removeAt(2);
```

## Iterating sequentially over the elements

Now we'll see how to perform one of the most basic — and perhaps most used — tasks when dealing with lists: iterating.

In this regard, both languages have very similar syntaxes. Both have several functions to perform this operation, including the famous `for` and more *complex* methods like `map`. But we'll look at the simplest one to use in everyday cases.

Starting with Dart, we have `for..in`. Inside the *body* of the statement (between the braces — `{` and `}`) we can do whatever operation we want on each `item`:

```dart
final list = [1, 2, 3, 4, 5];
for (final item in list) {
  print(item);
}
```

TypeScript also has the `for..in` statement available:

```typescript
const list = [1, 2, 3, 4, 5];
for (const item in list) {
  console.log(item);
}
```

But its behavior is quite different from what you might expect. Instead of the `item` variable being filled with the element's value, it gets the element's *index*. So the correct statement to use in this case is `for..of`:

```typescript
const list = [1, 2, 3, 4, 5];
for (const item of list) {
  console.log(item);
}
```

## Checking whether a specific item exists

It's not uncommon to have to iterate over a list to check whether a given item is present. Like in the TypeScript example below, where we check if there's any item greater than 3:

```typescript
const list = [1, 2, 3, 4, 5];
const hasItemGreaterThanThree = false;
for (const item of list) {
  if (item > 3) {
    hasItemGreaterThanThree = true;
  }
}
```

However, depending on the list, this operation can be quite laborious and not very performant. For that we have specific methods. In Dart we have the `any` method, where we can pass a *predicate* as a parameter to be used as the condition:

```dart
final list = [1, 2, 3, 4, 5];
final hasItemGreaterThanThree = list.any((item) => item > 3);
```

In TypeScript, we have the `some` method:

```typescript
const list = [1, 2, 3, 4, 5];
const hasItemGreaterThanThree = list.some((item) => item > 3);
```

These methods are highly recommended because they don't need to iterate the entire list. As soon as they find the first item that satisfies the condition, execution stops and `true` is returned.

## Filtering items

Besides checking whether an item exists in the list, iterating over a list can also be useful for getting items that meet a certain condition. In the example below, in Dart, we're adding the items with value less than 3 to a new list called `itemsLessThanThree`:

```dart
final list = [1, 2, 3, 4, 5];
final itemsLessThanThree = [];
for (final item in list) {
  if (item < 3) {
    itemsLessThanThree.add(item);
  }
}
```

But, once again, we have more appropriate functions for that. In Dart we have the `where` method:

```dart
final list = [1, 2, 3, 4, 5];
final itemsLessThanThree = list.where((item) => item < 3);
```

And, in TypeScript, we have the `filter` method:

```typescript
const list = [1, 2, 3, 4, 5];
const itemsLessThanThree = list.filter((item) => item < 3);
```

<h2 id="conclusion">Conclusion</h2>

With that we wrap up our simple comparison between TypeScript and Dart when dealing with iterable collections, where we could see some Dart advantages in this regard.

There are more features that can be explored to help us in our day-to-day work. Some of them can be found in the [References](#references) section.

Thank you. And see you in the next article!

<h2 id="references">References</h2>

- [DartPad](https://dart.dev/#try-dart)
- [TypeScript Playground](https://www.typescriptlang.org/)
- [Iterators and Generators - TypeScript Handbooks](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)
- [Iterable collections - Dart codelabs](https://dart.dev/codelabs/iterables)
- [Array in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
