import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create user
  const john = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      emailVerified: new Date(),
      name: "John Doe",
      password: await bcrypt.hash("foobar", 10),
      role: "ADMIN",
    },
  });

  // Create categories
  const beerCategory = await prisma.category.create({
    data: {
      name: "Beer",
      slug: "beer",
      color: "#FFA500", // Orange color
    },
  });

  const javascriptCategory = await prisma.category.create({
    data: {
      name: "JavaScript",
      slug: "javascript",
      color: "#F7DF1E", // JavaScript yellow
    },
  });

  // Create posts
  const kveikPost = await prisma.post.create({
    data: {
      title: "Understanding Kveik Yeast in Modern Brewing",
      slug: "kveik-yeast-modern-brewing",
      content: `Kveik is a family of traditional Norwegian farmhouse yeast strains that has revolutionized modern brewing. 
These remarkable yeasts can ferment at extremely high temperatures (30-40°C) while producing clean, fruity profiles.
Their fast fermentation capabilities and unique characteristics make them a valuable tool for both traditional and craft brewers.

## Commercial History
First commercialized in 2015 by Omega Yeast Labs with their HotHead strain, Kveik has since taken the brewing world by storm. 
While these yeasts command a premium price compared to traditional brewing strains, their ability to complete fermentation in 
as little as 48 hours (compared to traditional 14-21 days) makes them increasingly popular among commercial brewers.

## Flavor Diversity
The diversity of Kveik strains offers brewers a wide palette of flavors:

* **Voss Kveik**: Prominent orange-citrus notes
* **Hornindal**: Tropical fruit and pineapple characteristics
* **Oslo**: Clean, neutral profile - perfect for lager-style beers
* etc`,
      authorId: john.id,
      published: new Date(),
      categories: {
        create: [
          {
            category: {
              connect: { id: beerCategory.id },
            },
          },
        ],
      },
    },
  });

  const functionGeneratorPost = await prisma.post.create({
    data: {
      title: "Deep Dive into JavaScript Function Generators",
      slug: "deep-dive-javascript-function-generators",
      content: `Function generators in JavaScript are powerful tools for creating iterative algorithms. Using the function* syntax and yield keyword, we can create functions that can be paused and resumed, making them perfect for handling streams of data and implementing complex iterative logic.

## What Makes Generators Special?

Unlike regular functions that run to completion in one go, generators can pause their execution using the \`yield\` keyword. This unique ability makes them ideal for:

- Memory-efficient iteration over large datasets
- Creating infinite sequences
- Implementing complex state machines
- Managing asynchronous operations in a synchronous-looking way

## Basic Generator Syntax

\`\`\`javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
\`\`\`

## Practical Examples

### 1. Creating Infinite Sequences

\`\`\`javascript
function* fibonacciGenerator() {
  let prev = 0, curr = 1;
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacciGenerator();
// Get first 5 Fibonacci numbers
for (let i = 0; i < 5; i++) {
  console.log(fib.next().value); // 1, 1, 2, 3, 5
}
\`\`\`

### 2. Memory-Efficient Data Processing

\`\`\`javascript
function* chunkArray(array, size) {
  for (let i = 0; i < array.length; i += size) {
    yield array.slice(i, i + size);
  }
}

const data = [1, 2, 3, 4, 5, 6, 7, 8];
for (const chunk of chunkArray(data, 3)) {
  console.log(chunk); // [1,2,3], [4,5,6], [7,8]
}
\`\`\`

## Advanced Features

### Two-Way Communication

Generators support two-way communication using \`yield\`. You can pass values back into the generator using \`.next(value)\`:

\`\`\`javascript
function* twoWayGenerator() {
  const a = yield 'First yield';
  console.log('Received:', a);
  const b = yield 'Second yield';
  console.log('Received:', b);
}

const gen = twoWayGenerator();
console.log(gen.next());        // { value: 'First yield', done: false }
console.log(gen.next('Hello')); // Logs "Received: Hello"
                               // { value: 'Second yield', done: false }
console.log(gen.next('World')); // Logs "Received: World"
                               // { value: undefined, done: true }
\`\`\`

## Use Cases in Modern JavaScript

1. **Iterator Implementation**: Generators provide a clean way to implement custom iterators
2. **Async Operations**: With async generators (\`async function*\`), you can handle asynchronous data streams elegantly
3. **State Management**: Managing complex state transitions becomes more maintainable
4. **Data Processing Pipelines**: Creating composable data transformation pipelines

Function generators are a powerful feature that, while not commonly used in everyday programming, can significantly simplify complex iterative patterns and state management when applied appropriately.`,
      authorId: john.id,
      categories: {
        create: [
          {
            category: {
              connect: { id: javascriptCategory.id },
            },
          },
        ],
      },
    },
  });

  console.log("Database has been seeded! 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
