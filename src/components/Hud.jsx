import { useEffect, useState } from 'react';

// GTA VI (Leonida) release date
const LEONIDA_DROP = new Date('2026-11-19T00:00:00');

function pad(n) {
  return String(n).padStart(2, '0');
}

function countdown(now) {
  let diff = Math.max(0, LEONIDA_DROP - now);
  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  return `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
}

export default function Hud() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="hud">
      <div className="hud-center">
        <span className="hud-radio">
          <span className="hud-radio-dot" />98.4
        </span>
        <span className="hud-countdown">
          Leonida drops in <b>{countdown(now)}</b>
        </span>
      </div>

      <div className="hud-right">
        <div className="hud-stats">
          <span className="hud-time">{pad(now.getHours())}:{pad(now.getMinutes())}</span>
          <span className="hud-money">$2,500,000</span>
          <span className="hud-health">♥ 100</span>
        </div>
        <div className="hud-row">
          <span className="hud-bar"><span /></span>
          <span className="hud-stars">★★★★★</span>
          <span className="hud-badge">S</span>
        </div>
      </div>
    </header>
  );
}
