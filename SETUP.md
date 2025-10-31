# VibeCoder Setup Instructions

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)

### Running with Docker Compose

1. **Start all services:**
   ```bash
   docker compose up -d
   ```

2. **Check health:**
   ```bash
   curl http://localhost:8081/health
   ```

3. **View logs:**
   ```bash
   docker compose logs -f orchestrator
   ```

4. **Stop services:**
   ```bash
   docker compose down
   ```

### Rebuild After Changes

```bash
docker compose up -d --build
```

## 📁 Project Structure

```
VibeCoder/
├── apps/
│   ├── orchestrator/          # Node.js + TypeScript + Express backend
│   │   ├── src/
│   │   │   ├── index.ts       # Main server entry point
│   │   │   └── db.ts          # Database connection pool
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/                   # Future Next.js dashboard (empty)
├── packages/
│   ├── drivers/               # Integration drivers (empty)
│   └── agents/                # Agent definitions (empty)
├── infra/
│   └── schema.sql             # PostgreSQL database schema
├── docker-compose.yml         # Docker services configuration
└── package.json               # Monorepo root
```

## 🧪 Testing Endpoints

### Health Check
```bash
curl http://localhost:8081/health
```

Expected response:
```json
{
  "ok": true,
  "database": "connected",
  "timestamp": "2025-10-31T16:45:00.000Z"
}
```

## 🛠️ Local Development (without Docker)

1. **Start PostgreSQL:**
   ```bash
   docker compose up -d postgres
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd apps/orchestrator
   npm install
   ```

3. **Set environment variables:**
   ```bash
   cp apps/orchestrator/.env.example apps/orchestrator/.env
   ```

4. **Run in development mode:**
   ```bash
   npm run dev
   ```

## 🗄️ Database

The PostgreSQL database includes:
- `projects` - Project visions and metadata
- `tasks` - Derived executable tasks
- `runs` - Task execution logs
- `deployments` - Deployment tracking
- `journal` - Agent memory and learnings

## 🔮 Next Steps

1. Implement `/projects/init` endpoint
2. Implement `/tasks/run-next` endpoint
3. Create agent execution framework
4. Add driver integrations
5. Build web dashboard
