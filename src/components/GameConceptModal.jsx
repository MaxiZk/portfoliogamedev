import { useEffect, useRef, useState } from 'react';
import Anthropic from '@anthropic-ai/sdk';
import ConceptForm from './ConceptForm';
import ConceptCards from './ConceptCards';
import { generateConcepts } from '../lib/claude';
import '../styles/Modal.css';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function describeError(err) {
  if (err instanceof Anthropic.AuthenticationError) return 'Invalid API key. Check VITE_ANTHROPIC_API_KEY in .env.local';
  if (err instanceof Anthropic.RateLimitError) return 'Rate limited. Try again in a moment';
  if (err instanceof Anthropic.APIError) return `API error ${err.status}: ${err.message}`;
  if (err instanceof SyntaxError) return 'Could not parse the generated concepts. Try again';
  return err.message || 'Failed to generate concepts';
}

export default function GameConceptModal({ onClose }) {
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  // Focus the dialog on open, restore focus to the opener on close
  useEffect(() => {
    const opener = document.activeElement;
    modalRef.current?.querySelector(FOCUSABLE)?.focus();
    return () => opener?.focus?.();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !modalRef.current) return;

    // Keep Tab cycling inside the dialog
    const focusable = [...modalRef.current.querySelectorAll(FOCUSABLE)].filter((el) => !el.disabled);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError(null);
    setConcepts([]);

    try {
      setConcepts(await generateConcepts(formData));
    } catch (err) {
      setError(describeError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} onKeyDown={handleKeyDown}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="concept-modal-title"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-content">
          <h2 id="concept-modal-title">Game Concept Generator</h2>
          <p>Mix genre, mood, and mechanics to discover new game ideas powered by Claude AI</p>

          <ConceptForm onGenerate={handleGenerate} loading={loading} />

          {error && <div className="error" role="alert">{error}</div>}
          {loading && <div className="loading" role="status">Generating concepts...</div>}
          {concepts.length > 0 && <ConceptCards concepts={concepts} />}
        </div>
      </div>
    </div>
  );
}
