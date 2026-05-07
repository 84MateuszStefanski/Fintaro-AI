# Fintaro AI

Fintaro AI is a production-ready full-stack fintech SaaS starter for intelligent personal finance management. It combines budgeting, savings goals, investment tracking, analytics, notifications and AI-powered financial guidance in a polished Next.js application.

## Features

- **Authentication:** email/password registration and login with NextAuth credentials, protected routes and per-user data isolation.
- **Dashboard:** total balance, monthly income and expenses, savings rate, investment value, financial health score, recent transactions and AI insights.
- **Transactions:** create, delete, search, filter and sort income/expense transactions. API routes are included for CRUD integration.
- **Budgets:** monthly category budgets with progress bars and near-limit/exceeded warnings.
- **Savings goals:** emergency fund, vacation, car or house deposit style goals with progress and estimated monthly contribution.
- **Investments:** stocks, ETFs, crypto and cash holdings with mock/current prices, total value, P/L, allocation and performance charts.
- **Analytics:** income vs expenses, spending by category, budget usage, allocation, month-over-month indicators and health metrics.
- **AI assistant:** OpenAI-powered financial analysis when `OPENAI_API_KEY` is configured; realistic mock insights otherwise.
- **Notifications:** budget, goal, monthly summary and unusual spending notifications.
- **Settings:** profile, currency, theme preference and AI preferences.

## Tech stack

- **Frontend:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, shadcn-style UI primitives, Recharts, Lucide icons.
- **Backend:** Next.js server actions and API routes.
- **Database:** PostgreSQL with Prisma ORM and migrations.
- **Authentication:** NextAuth/Auth.js credentials flow with JWT sessions.
- **AI:** OpenAI API with mock fallback.
- **Ops:** Dockerfile, Docker Compose, PostgreSQL and optional Adminer.

## One-command Docker setup

```bash
docker compose up --build
```

After the build completes:

- App: <http://localhost:3000>
- Adminer: <http://localhost:8080>
- PostgreSQL: `localhost:5432`

The app container waits for PostgreSQL, runs Prisma migrations, seeds demo data and starts Next.js automatically.

## Demo credentials

```text
Email: demo@fintaro.ai
Password: demo1234
```

## Environment variables

Copy `.env.example` if you want local overrides:

```bash
cp .env.example .env
```

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string. Docker Compose provides `postgresql://fintaro:fintaro@db:5432/fintaro?schema=public`. |
| `NEXTAUTH_SECRET` | Yes | Secret used to sign NextAuth tokens. Replace in production. |
| `NEXTAUTH_URL` | Yes | Public app URL, usually `http://localhost:3000` locally. |
| `OPENAI_API_KEY` | No | Enables live AI insights. If absent, Fintaro uses realistic mock insights. |

## Useful commands

```bash
npm install
npm run dev
npm run build
npm run typecheck
npm run db:migrate
npm run db:seed
```

## Reset the database

To delete all container data and reseed from scratch:

```bash
docker compose down -v
docker compose up --build
```

## Project structure

```text
app/                Next.js App Router pages, layouts and API routes
components/         Shared application and chart components
components/ui/      shadcn-style reusable UI primitives
lib/                Auth, Prisma, data aggregation, AI and server actions
prisma/             Prisma schema, migration SQL and seed data
docker/             Container entrypoint scripts
scripts/            Reserved for operational scripts
types/              TypeScript module declarations
```

## Production notes

- Use a strong `NEXTAUTH_SECRET` in production.
- Configure `OPENAI_API_KEY` for live AI responses.
- Place the app behind TLS and a managed PostgreSQL service for production deployments.
- The Prisma schema includes user-scoped relations, timestamps and indexes for the core financial models.
