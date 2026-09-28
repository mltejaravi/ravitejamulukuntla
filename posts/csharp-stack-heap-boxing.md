Understanding **where** your data lives in memory is one of the things that separates a beginner from a confident C# developer. It also comes up in almost every .NET interview. Let's break it down.

## Value types vs reference types

| Value types | Reference types |
|---|---|
| `int`, `double`, `bool`, `char`, `decimal` | `class` instances |
| `struct`, `enum` | `string`, arrays |
| `DateTime`, `Guid` | `object`, delegates |

A **value type** variable holds the value itself. A **reference type** variable holds a *reference* (an address) pointing to an object somewhere else.

## The stack and the heap

- The **stack** is a small, very fast region used for method calls. Local value-type variables and references are stored here and are freed automatically when the method returns.
- The **heap** is a larger region for objects. Everything created with `new` for a class lives here, and the **Garbage Collector** cleans it up when nothing references it anymore.

```csharp
void Demo()
{
    int age = 30;                    // value stored on the stack
    Person p = new Person("Ravi");   // reference on the stack, object on the heap
}

class Person
{
    public string Name { get; }
    public Person(string name) => Name = name;
}
```

> **Precise note:** "value types live on the stack" is a simplification. A value type that is a *field of a class* lives on the heap inside that object. What matters is that value types are stored *inline* wherever their container is.

## Copy behaviour: the practical difference

```csharp
int a = 10;
int b = a;   // copies the value
b = 20;
Console.WriteLine(a); // 10

var p1 = new Person("Ravi");
var p2 = p1;          // copies the reference, both point to the same object
```

Assigning a value type copies the data. Assigning a reference type copies the pointer, so changes through one variable are visible through the other.

## Boxing

**Boxing** converts a value type into an `object` (or an interface it implements). The runtime allocates a new object on the heap and copies the value into it.

```csharp
int number = 42;
object boxed = number;   // boxing: heap allocation + copy
```

## Unboxing

**Unboxing** extracts the value type back out of the object. It requires an explicit cast to the *exact* type.

```csharp
object boxed = 42;
int number = (int)boxed;     // unboxing: OK
long wrong = (long)boxed;    // InvalidCastException at runtime!
```

## Why should you care?

Every box is a heap allocation, and every allocation is extra work for the Garbage Collector. Inside a tight loop that adds up fast:

```csharp
// Old non-generic collection: boxes every int
var list = new System.Collections.ArrayList();
for (int i = 0; i < 1_000_000; i++) list.Add(i);   // 1,000,000 boxes

// Generic collection: no boxing at all
var fast = new List<int>();
for (int i = 0; i < 1_000_000; i++) fast.Add(i);
```

**Tips to avoid unnecessary boxing:**

- Prefer generic collections (`List<T>`, `Dictionary<TKey, TValue>`) over `ArrayList` / `Hashtable`.
- Use string interpolation with modern .NET, which avoids boxing for common types.
- Be careful passing structs to methods that take `object` or a non-generic interface.

## Interview cheat sheet

- **Where are value types stored?** Inline, on the stack for locals, inside the object when they are fields.
- **What is boxing?** Wrapping a value type in a heap-allocated object.
- **Is unboxing implicit?** No, it needs an explicit cast to the exact type.
- **Cost?** An allocation plus a copy; avoid in hot paths.

Watch Part 3 of the C# course above for live demos of encapsulation, stack vs heap and boxing.
