import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRoutes from './routes/admin.js';
import { recordVisit } from './utils/stats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// 방문자 기록
app.post('/api/visit', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || req.ip || 'unknown').split(',')[0].trim();
  recordVisit(ip);
  res.json({ ok: true });
});

// 관리자 API
app.use('/api/admin', adminRoutes);

// 정적 파일 서빙
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CSSKit server running on port ${PORT}`);
});
