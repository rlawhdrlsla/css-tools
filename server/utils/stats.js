import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Railway Volume 경로 지원 (UPLOADS_DIR 환경변수로 지정 가능)
const DATA_DIR = process.env.UPLOADS_DIR || path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const STATS_FILE = path.join(DATA_DIR, 'stats.json');

function load() {
  if (!fs.existsSync(STATS_FILE)) return { visitors: { total: 0, daily: {} } };
  try { return JSON.parse(fs.readFileSync(STATS_FILE, 'utf8')); }
  catch { return { visitors: { total: 0, daily: {} } }; }
}

function save(data) {
  fs.writeFileSync(STATS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export function recordVisit(ip) {
  const data = load();
  const today = new Date().toISOString().slice(0, 10);

  if (!data.visitors) data.visitors = { total: 0, daily: {} };
  if (!data.visitors.daily[today]) data.visitors.daily[today] = { count: 0, ips: [] };

  const hash = crypto.createHash('sha256').update(ip || 'unknown').digest('hex').slice(0, 16);

  if (!data.visitors.daily[today].ips.includes(hash)) {
    data.visitors.daily[today].ips.push(hash);
    data.visitors.daily[today].count++;
  }

  // 90일 이전 삭제
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 90);
  for (const date of Object.keys(data.visitors.daily)) {
    if (new Date(date) < cutoff) delete data.visitors.daily[date];
  }

  save(data);
}

export function getStats() {
  const data = load();
  const today = new Date().toISOString().slice(0, 10);

  const todayVisitors = data.visitors?.daily[today]?.count || 0;

  // daily 합산으로 전체 방문자 계산 (파일 리셋 시에도 정확)
  const visitorsTotal = Object.values(data.visitors?.daily || {})
    .reduce((sum, d) => sum + (d.count || 0), 0);

  // 최근 30일 일별 데이터
  const dailySeries = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dailySeries.push({ date: key, visitors: data.visitors?.daily[key]?.count || 0 });
  }

  return { visitorsTotal, todayVisitors, daily: dailySeries };
}
