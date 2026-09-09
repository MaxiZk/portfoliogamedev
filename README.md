# Game Concept AI Portfolio

A production-ready AI-enhanced frontend application that generates game concepts using Claude API. Built as a capstone for Frontend AI Engineering.

## Live Demo

https://game-concept-ai-portfolio.netlify.app

## Features

- **Game Concept Generator** — Mix genre, mood, and mechanics to generate unique game concepts powered by Claude AI
- **Vice City Loading Screen UI** — GTA-style HUD, neon menu panel, live countdown and rotating comic-style backgrounds
- **Accessible Components** — Follows WCAG 2.1 AA standards; modal is keyboard-navigable
- **Responsive Design** — Works on desktop and mobile
- **Error Handling** — Graceful fallbacks for API failures

## AI Integration

**Claude API (`claude-opus-5`)** generates 3 game concepts from user inputs:

```javascript
// Example prompt:
"Generate 3 unique game concepts with these parameters:
Genre: Action
Mood: Dark
Core Mechanic: Turn-based combat

Return ONLY valid JSON..."
```

Each concept includes: title, pitch, mechanics explanation, and target audience.

## Setup & Run

```bash
# 1. Clone repo
git clone git@github.com:MaxiZk/portfoliogamedev.git
cd portfoliogamedev

# 2. Install
npm install

# 3. Create .env.local
cat > .env.local << 'EOF'
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
EOF

# 4. Run dev server
npm run dev
# Visit http://localhost:5173
```

## Architecture

```
src/
├── App.jsx                   ← Main app, modal state
├── components/
│   ├── Hero.jsx              ← Loading-screen layout, background carousel, START GAME
│   ├── Hud.jsx               ← GTA-style HUD (radio, countdown, clock, money, health)
│   ├── Nav.jsx               ← Menu bars inside the hero panel
│   ├── GameConceptModal.jsx  ← Modal wrapper, API orchestration, error mapping
│   ├── ConceptForm.jsx       ← Form inputs (genre, mood, mechanic)
│   └── ConceptCards.jsx      ← Expandable concept display
├── lib/
│   └── claude.js             ← Anthropic SDK client, prompt, JSON parsing
├── styles/
│   └── Modal.css             ← Modal & form styling
└── App.css                   ← Hero, HUD & menu styling
```

## AI Integration Explained

1. **User fills form** (Genre, Mood, Core Mechanic)
2. **Modal calls Claude API** with structured prompt
3. **Claude returns JSON** with 3 game concepts
4. **React renders ConceptCards** with expand/collapse
5. **Error handling** for API failures, rate limits

**Why Claude?**
- Understands game design patterns
- Generates creative, coherent game concepts
- Structured JSON output for reliable parsing

## Known Limitations

- API rate limit: 60 requests/hour (free tier)
- No authentication required (dev mode)
- The API key ships in the browser bundle (`dangerouslyAllowBrowser`); fine for a portfolio demo, not for production
- Concepts are synthetic (designed for creativity, not production game data)
- No persistence (concepts are lost on page reload)

## Future Improvements

- [ ] Save favorite concepts to localStorage
- [ ] Export concepts as GDD templates
- [ ] Add more granular mechanics via checkboxes
- [ ] Streaming API responses for faster UX
- [ ] Multiplayer concept brainstorming
- [ ] Integration with game engines (Unity export)
- [ ] Move the Claude call to a Netlify serverless function to keep the key off the client

## Testing

```bash
npm run test
```

Runs Vitest with coverage. Current coverage: **61% lines / 54% statements** (18 tests, 3 suites). Components tested: ConceptForm, ConceptCards, GameConceptModal (87-100%). Hero, Nav, Hud, and API layer are visual/integration-only.

## Deployment

Deployed on Netlify. Every push to `main` triggers auto-deploy.

```bash
# Manual deploy
npm run build
netlify deploy --prod --dir=dist
```

## Performance

**Lighthouse 13 (Desktop preset, production build on `vite preview`):**
- Performance: **80/100** (LCP 3.6 s, driven by the 900 kB hero backgrounds; FCP 0.7 s, TBT 0 ms, CLS 0.004)
- Accessibility: **100/100**
- Best Practices: **100/100**
- SEO: **100/100**

See `/lighthouse-report.html` for the full audit. The first run scored 89 / 82 on Accessibility / SEO; fixes: START GAME contrast raised to 5.1:1, carousel dots given 24 px hit targets, meta description and `robots.txt` added.

## Accessibility

- Modal has keyboard focus trap (Tab cycles, Escape closes)
- Form labels are associated with inputs (`<label htmlFor>`)
- Expandable cards use `aria-expanded` and support Enter/Space keys
- Color contrast > 4.5:1 WCAG AA
- Lighthouse Accessibility score: **100/100**
- Tested with Vitest: all a11y assertions passing (18/18)

## Reflection

**Hardest part:** Parsing Claude's JSON reliably. Initial approach had no error boundaries; added try-catch + fallback messaging.

**Surprise:** The form validation logic became the most complex piece, not the API call. User expectations around error states drove 40% of the code.

**Next time:** Would start with error states + edge cases before happy path. Also would add request debouncing (users spam the button).

**What I learned:**
- AI output is inherently unpredictable — structure your data contracts tightly
- Modal focus management is harder than it looks (StrictMode double-mounts caught a bug)
- Lighthouse doesn't penalize API latency, but users do — consider skeleton loading states early

## Author

Máximo Zuidwijk
Engineering Student @ USAL
GitHub: @MaxiZk

---

*Built with React + Vite + Claude API. Deployed on Netlify.*
