import express from 'express';
import helmet from 'helmet';
import questionnaireRoutes from './api/routes/questionnaires';
import responseRoutes from './api/routes/responses';
import { logger } from '../utils/logger';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/questionnaires', questionnaireRoutes);
app.use('/api/responses', responseRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

export default app;