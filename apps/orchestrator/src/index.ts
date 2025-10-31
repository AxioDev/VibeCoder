import express, { Request, Response } from 'express';
import { createDatabasePool, testConnection } from './db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());

// Health check endpoint
app.get('/health', async (req: Request, res: Response) => {
  try {
    const dbConnected = await testConnection();
    res.json({
      ok: true,
      database: dbConnected ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Initialize database pool
createDatabasePool();

app.listen(PORT, () => {
  console.log(`🚀 VibeCoder Orchestrator running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
