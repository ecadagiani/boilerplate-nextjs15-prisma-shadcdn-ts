# Next.js 15 Full-Stack Template

// TODO: add disclaimer about this stack
// Add a branch with cleaned project to be used at a good start

A modern, Docker-ready full-stack template built with Next.js 15, Prisma ORM, and shadcn/ui components. This template provides a robust starting point for building scalable web applications with a clean architecture and developer-friendly setup.

## Features

- 🚀 **Next.js 15** with App Router
- ⚛️ **React 19** with server actions
- 🛢️ **Prisma ORM** with PostgreSQL
- 🎨 **shadcn/ui** components
- 🔐 **NextAuth** for authentication (with simple role enum access control)
- 🎯 **TypeScript** for type safety
- 🐳 **Docker** configuration for development
- 🔧 **Development Tools**:
  - Prisma Studio for database management
  - Adminer to view prisma modifications

## Prerequisites

- Docker and Docker Compose

## Getting Started

### 1. Clone and Setup

```bash
# Clone the repository
git clone [repository-url]
cd [project-name]

# Copy environment file
cp .env.dist .env

# Install dependencies
npm install

# Generate Prisma types
npm run prisma:generate
```

### 2. Configure Environment

Update [`.env`](.env) file with your variables, database credentials, and ports.

### 3. Launch with Docker

```bash
# Build and start all services
docker-compose up -d --build
```

The application will be available at:
- Next.js App: `http://localhost:3000`
- Prisma Studio: `http://localhost:5555`
- Adminer: `http://localhost:8080`

> You can change the ports in the `.env` file.

### 4. Seed the Database

```bash
npm run docker:prisma:db:seed
```
> or in local development
> ```bash
> npm run prisma:db:seed
> ```

## Database Management

### During development, apply schema without migration

When you modify the Prisma schema and want to test changes without creating a migration:

1. Push schema changes directly to the database:
```bash
npm run docker:prisma:db:push
```

2. The command will:
   - Push the schema changes to the database
   - Regenerate Prisma Client

### Seeding the Database

To populate your database with initial data:

```bash
# For Docker environment (recommended)
npm run docker:prisma:db:seed

# For local development
npm run prisma:db:seed
```

The command will execute the seed script defined in `prisma/seed.ts` to create initial data in your database.

### Before commit, apply schema changes
When you modify the Prisma schema [`prisma/schema/schema.prisma`](prisma/schema/schema.prisma), you need to:

1. Generate a new migration:
```bash
npm run docker:prisma:migrate:dev
```

2. The command will:
   - Create a new migration file
   - Apply the migration to your database
   - Regenerate Prisma Client

## Development Workflow

### Docker Development (Recommended)
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

#### Installing New Dependencies

When adding new npm packages to the project:

1. Install the package locally first:
```bash
npm install package-name
```

2. Rebuild the Docker container to include the new dependency:
```bash
docker-compose up -d --build
```

> Note: The rebuild is necessary because dependencies are installed inside the Docker container during the build process.

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.