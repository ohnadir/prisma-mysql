# Prisma-MySQL Project

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **Redis** (v6 or higher)
- **npm** or **yarn** package manager

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Prisma-MySql
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:
```env
DATABASE_URL="mysql://user:password@localhost:3306/database_name"
REDIS_URL="redis://localhost:6379"
NODE_ENV="development"
```

### 4. Database Setup

Initialize Prisma and generate the Prisma Client:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

## Project Overview

This project demonstrates a modern stack for building scalable applications with:
- **Prisma ORM** for database management
- **MySQL** as the primary database
- **Redis** for caching and session management
- **Node.js** runtime environment
    
## Available Scripts

- `npm start` - Start the application
- `npm run dev` - Run in development mode
- `npm test` - Run tests
