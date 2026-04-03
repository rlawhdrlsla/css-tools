import { Router } from 'express';
import { getStats } from '../utils/stats.js';

const router = Router();

function adminAuth(req, res, next) {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) return res.status(503).json({ error: 'ADMIN_KEY not set' });
  if (req.headers['x-admin-key'] !== adminKey) return res.status(401).json({ error: '인증 실패' });
  next();
}

router.post('/verify', adminAuth, (req, res) => res.json({ ok: true }));

router.get('/stats', adminAuth, (req, res) => res.json(getStats()));

export default router;
