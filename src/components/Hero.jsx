import { useEffect, useState } from 'react';
import Nav from './Nav';
import Hud from './Hud';

const BACKGROUNDS = [
  '/vice_city_loading_screen_2.webp',
  '/beach_laptop_comic.webp',
  '/rainy_rooftop_cityscape.webp',
  '/miami_vice_thinker.webp',
];

const SLIDE_MS = 9000;

export default function Hero({ onStartGame }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % BACKGROUNDS.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [slide]);

  return (
    <section className="hero">
      {BACKGROUNDS.map((src, i) => (
        <div
          key={src}
          className={`hero-bg ${i === slide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="hero-shade" />

      <Hud />

      <div className="menu-panel">
        <h1 className="hero-title">Maximo<br />Zuidwijk</h1>
        <p className="portfolio-label">Portfolio</p>
        <button className="start-game-btn" onClick={onStartGame}>
          Start Game <span className="play">▶</span>
        </button>
        <Nav />
      </div>

      <div className="objective">
        <div className="minimap">
          <svg viewBox="0 0 88 56" aria-hidden="true">
            <polyline points="6,40 28,30 46,34 62,20 82,14" />
            <circle cx="46" cy="34" r="3" />
          </svg>
        </div>
        <span className="objective-label">Current Objective</span>
        <p className="objective-title">Build next level digital experiences</p>
        <p className="objective-sub">Vice City Inspired • Build Different • Stay Legendary</p>
      </div>

      <div className="carousel-dots">
        {BACKGROUNDS.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Background ${i + 1}`}
            className={`dot ${i === slide ? 'active' : ''}`}
            onClick={() => setSlide(i)}
          />
        ))}
      </div>

      <figure className="quote">
        <blockquote>"Code is my weapon. Creativity is my world."</blockquote>
        <figcaption>
          <b>— Máximo</b> • Manual testing sharpened my eye for how systems break.
          Now I build tools that catch it.
        </figcaption>
      </figure>
    </section>
  );
}
