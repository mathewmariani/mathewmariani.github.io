---
layout: post
title: "The Wren Slot Array"
description: "Understanding how to manipulate the Wren slot array."
date: 2018-08-05
tag: C/C++
---

## The Slot Array

[Wren](http://wren.io/) passes data in and out of its virtual machine using **slots**.

This array of slots is dynamically sized and each slot stores a [Wren Value](http://wren.io/values.html). Nearly all functions in the API use slots, and when Wren needs to pass you data through C it ensures there are enough slots for the objects it is sending you.

```
wrenEnsureSlots(vm, 4);
```

<!-- description -->
Since the array is dynamically sized it's our responsibility to ensure there are enough slots before accessing them. Reading or writting from a slot that we haven't ensured may lead to unexpected results.

```
| slot | array         |
|:----:| ------------- |
| 0    | null          |
| 1    | null          |
| 2    | null          |
| 3    | null          |
```

In this case `wrenGetSlotCount(vm)` would return >= 4.


## Writting to Slots

```
wrenSetSlotBool(vm, 0, true);
wrenSetSlotDouble(vm, 1, 3.14159);
wrenSetSlotNull(vm, 2);
wrenSetSlotString(vm, 3, "hi there");
```

<!-- description -->
Each of these functions take a primitive C value and converts it to a corresponding Wren Value for a slot.

- `wrenSetSlotBool(WrenVM* vm, int slot, bool value)` stores the boolean `value` in `slot`.
- `wrenSetSlotDouble(WrenVM* vm, int slot, double value)` stores the number `value` in `slot`.
- `wrenSetSlotNull(WrenVM* vm, int slot)` stores null in `slot`.
- `wrenSetSlotString(WrenVM* vm, int slot, const char* text)` stores the string `text` in `slot`.

```
| slot | array         |
|:----:| ------------- |
| 0    | true          |
| 1    | 3.14159       |
| 2    | null          |
| 3    | "hi there"    |
```

In this case `wrenGetSlotType(vm, 1)` would return `WREN_TYPE_NUM`.


## Reading from Slots

```
wrenGetSlotBool(vm, int 0);     // > true
wrenGetSlotDouble(vm, int 1);   // > 3.14159  
wrenGetSlotString(vm, int 2);   // > “hi there”
```

<!-- description -->
These take a Wren Value and convert it to its raw C representation.

Since Wren is a dynamically type language you want to ensure you're accessing the proper data type for a given slot. It is an error to call these functions if the slot does not contain the expected type value.

- `wrenGetSlotBool(WrenVM* vm, int slot, bool value)` Reads a boolean value from `slot`.
- `wrenGetSlotDouble(WrenVM* vm, int slot, double value)` Reads a number value from `slot`.
- `wrenGetSlotString(WrenVM* vm, int slot, const char* text)` Reads a string value from `slot`.

```
| slot | array         |
|:----:| ------------- |
| 0    | true          |
| 1    | 3.14159       |
| 2    | null          |
| 3    | "hi there"    |
```

In this case `wrenGetSlotType(vm, 3)` would return `WREN_TYPE_NULL`.