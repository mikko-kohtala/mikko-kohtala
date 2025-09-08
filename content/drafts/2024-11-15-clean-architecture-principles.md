---
title: "Clean Architecture: Building Maintainable Systems"
date: "2024-11-15"
description: "Exploring clean architecture principles and how they lead to more maintainable and testable software systems."
author: "Mikko Kohtala"
tags: ["Architecture", "Clean Code", "Best Practices", "Design Patterns"]
---

Clean architecture isn't just about organizing code—it's about creating systems that can evolve with changing requirements while maintaining their integrity and testability.

## The Core Principles

At the heart of clean architecture are several key principles that guide our design decisions:

### Dependency Inversion

The most fundamental principle is that dependencies should point inward. Business logic should never depend on external frameworks, databases, or UI concerns. Instead, these external layers depend on the business logic.

```typescript
// Bad: Business logic depends on infrastructure
class UserService {
  constructor(private database: PostgresDB) {}
  
  async getUser(id: string) {
    return this.database.query(`SELECT * FROM users WHERE id = $1`, [id]);
  }
}

// Good: Infrastructure depends on business logic
interface UserRepository {
  findById(id: string): Promise<User>;
}

class UserService {
  constructor(private repository: UserRepository) {}
  
  async getUser(id: string) {
    return this.repository.findById(id);
  }
}
```

### Separation of Concerns

Each layer of your application should have a single, well-defined responsibility:

- **Entities**: Core business logic and rules
- **Use Cases**: Application-specific business rules
- **Interface Adapters**: Convert data between use cases and external agencies
- **Frameworks & Drivers**: External tools and delivery mechanisms

## Practical Implementation

When implementing clean architecture in real projects, consider these patterns:

### Use Case Pattern

Encapsulate each user interaction in a dedicated use case class:

```typescript
class CreateUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private emailService: EmailService
  ) {}
  
  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    // Validate input
    const validatedData = this.validate(input);
    
    // Apply business rules
    const user = new User(validatedData);
    
    // Persist
    await this.userRepo.save(user);
    
    // Side effects
    await this.emailService.sendWelcome(user.email);
    
    return this.presenter.present(user);
  }
}
```

### Repository Pattern

Abstract data access behind interfaces:

```typescript
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}
```

## Benefits in Practice

After applying these principles in multiple projects, the benefits become clear:

1. **Testability**: Business logic can be tested without databases or frameworks
2. **Flexibility**: Switching databases or frameworks becomes straightforward
3. **Maintainability**: Changes are localized to specific layers
4. **Team Scalability**: Clear boundaries enable parallel development

## Common Pitfalls

Watch out for these common mistakes:

- **Leaky Abstractions**: Don't let database-specific concepts leak into business logic
- **Over-engineering**: Start simple and refactor towards clean architecture as needed
- **Ignoring Pragmatism**: Sometimes a simple CRUD operation doesn't need all layers

## Conclusion

Clean architecture is an investment in your software's future. While it requires more upfront thought and planning, the payoff in maintainability, testability, and flexibility makes it worthwhile for any system expected to evolve over time.

Remember: the goal isn't to follow rules blindly, but to create systems that are easy to understand, modify, and extend. Clean architecture provides a proven framework for achieving these goals.