---
layout: post
title: "The Squirrel Stack"
description: "Understanding how to manipulate the Squirrel stack."
date: 2017-05-21
---

<!-- the stack -->
### The Stack

<div markdown="1" class="row">
<div markdown="1" class="col-sm">

[Squirrel](http://www.squirrel-lang.org/) exchanges values with the virtual machine through a stack.

Nearly all functions in the API use the stack. Squirrel manipulates this stack arbitrarily using an index to refer to any element in the stack.

For instance to call a Squirrel function from C the  function and the arguments must be pushed onto the stack .

</div>
<div markdown="1" class="col-sm">

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -3   | closure 			 |
| 2   | -2   | string				 |
| 3   | -1   | integer			 |

<small class="muted">In this case `sq_gettop(v)` would return 3.</small>

</div>
</div>

<!-- begin `stack manipulation` -->
### Stack Manipulation

<div markdown="1" class="row">
<div markdown="1" class="col-sm">

```cpp
sq_pushstring(v, "string", -1);	// +1
sq_pushfloat(v, 3.14);		// +1
sq_pushinteger(v, 3);		// +1
sq_pushbool(v, true);		// +1
sq_pushuserpointer(v, ptr);	// +1
sq_pushnull(v);			// +1
```


<!-- description -->
These functions push C values onto the stack.

`sq_pushstring(SQVM *v, const char *s, int len)` pushes a string onto the stack.

`sq_pushfloat(SQVM *v, float f)` pushes a float onto the stack.

`sq_pushinteger(SQVM *v, int n)` pushes an integer onto the stack.

`sq_pushbool(SQVM *v, bool b)` pushes a bool onto the stack.

`sq_pushuserpointer(SQVM *v, void *p)` pushes pointer onto the stack.

`sq_pushnull(SQVM *v)` pushes null onto the stack.

</div>
<div markdown="1" class="col-sm">

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -6   | string				 |
| 2   | -5   | float				 |
| 3   | -4   | integer			 |
| 4   | -3   | bool					 |
| 5   | -2   | userpointer	 |
| 6   | -1   | null					 |

<small class="muted">In this case `sq_gettop(v)` would return 6.</small>

</div>
</div>

<div markdown="1" class="row">
<div markdown="1" class="col-sm">

```cpp
sq_pop(v, 2);			// -2
sq_push(v, -1);			// +1
sq_remove(v, -2);		// -1
```


<!-- description -->
`sq_pop(SQVM *v, int n)` pops n elements from the stack.

`sq_push(SQVM *v, int idx)` pushes the value at `idx` onto the stack.

`sq_remove(SQVM *v, int idx)` removes the value at `idx` from the stack. `sq_remove(v, -1)` is equivalent to `sq_poptop(SQVM *v)` which removes the value from the top of the stack.

</div>
<div markdown="1" class="col-sm">

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -4   | string				 |
| 2   | -3   | integer			 |
| 3   | -2   | bool					 |
| 4   | -1   | string				 |

<small class="muted">In this case `sq_gettop(v)` would return 4.</small>

</div>
</div>


<!-- end `stack manipulation` -->


<!-- begin slots -->
### Slots

<div markdown="1" class="row">
<div markdown="1" class="col-sm">

```cpp
sq_pushroottable(v);		// +1
sq_pushstring(v, "pi", -1);	// +1
sq_pushfloat(v, 3.1415); 	// +1
```


<!-- description -->
Classes and Tables are associative containers implemented as [k, v] pairs called _slots_.

Keys and Values can take on any Squirrel basic type. These types are integer, float, string, null, table, array, function, generator, class, instance, bool, thread
and userdata.

</div>
<div markdown="1" class="col-sm">

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -3   | table				 |
| 2   | -2   | string				 |
| 3   | -1   | float				 |

</div>
</div>

<div markdown="1" class="row">
<div markdown="1" class="col-sm">

```cpp
sq_pushroottable(v);		// +1
sq_pushstring(v, "pi", -1);	// +1
sq_pushfloat(v, 3.1415); 	// +1
sq_newslot(v, -3, false);	// -2
```


<!-- description -->
Slots can be added through set operations. These operations checks if a key is present in an object at `idx` on the stack.

`sq_newslot(SQVM *v, idx, bool static)` pops a [k, v] pair from the stack and performs a set operation on the table or class at position `idx` on the
stack; if the slot does not exits it will be created.

</div>
<div markdown="1" class="col-sm">

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -1   | table				 |

</div>
</div>

<div markdown="1" class="row">
<div markdown="1" class="col-sm">

```cpp
sq_pushroottable(v);		// +1
sq_pushstring(v, "pi", -1);	// +1
sq_get(v, -2);			// +0
```


<!-- description -->

Slots can be retrieved through get operations. These operations checks if a key is present in an object at `idx` on the stack.

`sq_get(SQVM *v, int idx)` pops a key from the stack and performs a get operation on the object at the position `idx` in the stack, and pushes the
result onto the stack.

`sq_rawget(SQVM *v, int idx)` pops a key from the stack and performs a get operation on the object at position `idx` onto the stack, without employing
delegation or metamethods.

</div>
<div markdown="1" class="col-sm">

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -2   | table				 |
| 2   | -1   | string				 |

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -2   | table				 |
| 2   | -1   | float				 |

<small>`sq_get(v, -2);` has been called on the table.</small>

</div>
</div>

<!-- end `slots` -->

<!-- begin `tables` -->
### Tables

<div markdown="1" class="row">
<div markdown="1" class="col-sm">

```cpp
sq_pushroottable(v);		// +1
sq_pushstring(v, "table", -1);	// +1
sq_newtable(v);			// +1
// add slots here
sq_newslot(v, -3, false) 	// -2
```


<!-- description -->
`sq_newtable(SQVM *v)` creates a new table and pushes onto the stack.

`sq_newtableex(SQVM *v, int size)` creates a new table, of a specific size, and pushes onto the stack. This function prevents unnecessary rehashing when the number of slots required is known at the time of creation.

<!-- description -->
Classes and Tables are associative containers implemented as [k, v] pairs called _slots_.

</div>
<div markdown="1" class="col-sm">

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -3   | table				 |
| 2   | -2   | string				 |
| 3   | -1   | table				 |

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -1   | table				 |

<small>`sq_newslot(v, -3, false)` has been called on the table.</small>

</div>
</div>

<!-- end `tables` -->


<!-- begin `classes` -->
### Classes

<div markdown="1" class="row">
<div markdown="1" class="col-sm">

```cpp
sq_pushroottable(v);		// +1
sq_pushstring(v, "class", -1);	// +1
sq_newclass(v, false);		// +1

sq_pushstring(v, "foo", -1);	// +1
sq_newclosure(v, &foo, 0, 0);	// +1
sq_newslot(v, -3, false);	// -2

sq_newslot(v, -3, false) 	// -2
```


<!-- description -->
`sq_newclass(SQVM *v, bool hasbase)` creates a new class object and pushes onto the stack.

`sq_newclosure(SQVM *v, SQFUNCTION f, int freevars)` creates a new native closure and pushes the new closure onto the stack.

</div>
<div markdown="1" class="col-sm">

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -5  | table					 |
| 2   | -4  | string				 |
| 3   | -3  | class					 |
| 4   | -2  | string				 |
| 5   | -1  | closure				 |

<small>`sq_newslot(v, -3, false)` has not yet been called on the class.</small>

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -1   | table				 |

<small>`sq_newslot(v, -3, false)` has been called on the table.</small>


</div>
</div>


<!-- end `classes` -->

<!-- begin `arrays` -->
### Arrays

<div markdown="1" class="row">
<div markdown="1" class="col-sm">

```cpp
sq_pushroottable(v);		// +1
sq_pushstring(v, "array", -1);	// +1
sq_newarray(v, 3);		// +1

sq_pushinteger(v, 5);		// +1
sq_arrayappend(v, -2);		// -1

sq_pushinteger(v, 8);		// +1
sq_arrayappend(v, -2);		// -1

sq_pushinteger(v, 13);		// +1
sq_arrayappend(v, -2);		// -1

sq_newslot(v, -3, false) 	// -2
```


<!-- description -->
`sq_newarray(SQVM *v, int size)` creates a new array of size `size` and pushes onto the stack.

`sq_arrayappend(SQVM *v, int idx)` pops a value from the stack and appends it to the back of the array at the position `idx` in the stack.

</div>
<div markdown="1" class="col-sm">

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -4   | table				 |
| 2   | -3   | string				 |
| 3   | -2   | array				 |
| 4   | -1   | integer			 |

<small>`sq_arrayappend(v, -2)` has not yet been called on the array.</small>

| idx | nidx | stack         |
|:---:|:----:| ------------- |
| 1   | -1   | table				 |

<small>`sq_newslot(v, -3, false)` has been called on the table.</small>


</div>
</div>


<!-- end `arrays` -->

<!-- dirty hack -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script>
$("table").addClass("table table-bordered");
</script>
