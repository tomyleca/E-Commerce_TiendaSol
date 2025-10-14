import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default function docsRoutes() {
  const router = express.Router();

 
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const apiSpecPath = path.resolve(__dirname, '../docs/api-docs.json');
  const apiSpec = JSON.parse(fs.readFileSync(apiSpecPath, 'utf-8'));

  
  router.get('/api-docs.json', (_req, res) => res.json(apiSpec));

  
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec, { explorer: true }));

  return router;
}
