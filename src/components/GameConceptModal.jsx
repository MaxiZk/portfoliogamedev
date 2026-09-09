import { useState, useRef, useEffect } from 'react';
import Anthropic from '@anthropic-ai/sdk';
import ConceptForm from './ConceptForm';
import ConceptCards from './ConceptCards';
import { generateConcepts } from '../lib/claude';
import '../styles/Modal.css';

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
  const closeButtonRef = useRef(null);

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

  // Focus trap: Tab cycles within modal, Escape closes
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleKeyDown = (e) => {
      // Escape closes
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Tab trap
      if (e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift+Tab: wrap to last element
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab: wrap to first element
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    // Store previous focus to restore on close
    const previousActiveElement = document.activeElement;

    // Focus close button on mount
    closeButtonRef.current?.focus();

    modal.addEventListener('keydown', handleKeyDown);

    return () => {
      modal.removeEventListener('keydown', handleKeyDown);
      // Restore focus on unmount
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ✕
        </button>

        <div className="modal-content">
          <h2 id="modal-title">Game Concept Generator</h2>
          <p>Mix genre, mood, and mechanics to discover new game ideas powered by Claude AI</p>

          <ConceptForm onGenerate={handleGenerate} loading={loading} />

          {error && <div className="error" role="alert">{error}</div>}
          {loading && <div className="loading" aria-live="polite">Generating concepts...</div>}
          {concepts.length > 0 && <ConceptCards concepts={concepts} />}
        </div>
      </div>
    </div>
  );
}
