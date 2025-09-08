---
title: "TypeScript Type Safety: Beyond the Basics"
date: "2024-12-20"
description: "Deep dive into advanced TypeScript patterns for building truly type-safe applications."
author: "Mikko Kohtala"
tags: ["TypeScript", "Type Safety", "JavaScript", "Best Practices"]
---

TypeScript has transformed how we write JavaScript applications, but many developers only scratch the surface of its type system. Let's explore advanced patterns that can make your code more robust and maintainable.

## The Power of Discriminated Unions

One of TypeScript's most powerful features is discriminated unions. They allow us to model complex state machines and ensure exhaustive handling:

```typescript
type ApiResponse<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function handleResponse<T>(response: ApiResponse<T>) {
  switch (response.status) {
    case 'loading':
      return <Spinner />;
    case 'success':
      return <DataView data={response.data} />;
    case 'error':
      return <ErrorMessage error={response.error} />;
  }
}
```

## Template Literal Types

Template literal types enable us to create type-safe string manipulation:

```typescript
type EventName = 'click' | 'focus' | 'blur';
type EventHandler<T extends EventName> = `on${Capitalize<T>}`;

// Type: "onClick" | "onFocus" | "onBlur"
type Handlers = EventHandler<EventName>;
```

## Conditional Types for Flexibility

Conditional types allow us to create types that adapt based on their inputs:

```typescript
type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string>;        // string
type Num = Flatten<number[]>;      // number
```

## The Builder Pattern with Type Safety

Implementing a type-safe builder pattern ensures compile-time validation:

```typescript
class QueryBuilder<T = {}> {
  private query: T;

  constructor(query: T = {} as T) {
    this.query = query;
  }

  where<K extends string>(key: K, value: any): QueryBuilder<T & Record<K, typeof value>> {
    return new QueryBuilder({ ...this.query, [key]: value });
  }

  build(): T {
    return this.query;
  }
}

const query = new QueryBuilder()
  .where('name', 'John')
  .where('age', 30)
  .build();
// Type: { name: string; age: number }
```

## Mapped Types for Transformations

Mapped types let us transform existing types systematically:

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

## Type Guards for Runtime Safety

Custom type guards bridge the gap between compile-time and runtime type safety:

```typescript
interface User {
  type: 'user';
  name: string;
  email: string;
}

interface Admin extends User {
  type: 'admin';
  permissions: string[];
}

function isAdmin(user: User): user is Admin {
  return user.type === 'admin';
}

function processUser(user: User) {
  if (isAdmin(user)) {
    // TypeScript knows user is Admin here
    console.log(user.permissions);
  }
}
```

## Conclusion

TypeScript's type system is incredibly powerful when used to its full potential. By leveraging these advanced patterns, we can catch more bugs at compile time, make our code self-documenting, and provide better developer experiences.

The goal isn't to use every feature available, but to understand what's possible and apply the right patterns where they provide value. Type safety isn't just about preventing errors—it's about encoding business logic into our type system and making invalid states unrepresentable.