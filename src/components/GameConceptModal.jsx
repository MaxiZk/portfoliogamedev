import { useState } from 'react';
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-content">
          <h2>Game Concept Generator</h2>
          <p>Mix genre, mood, and mechanics to discover new game ideas powered by Claude AI</p>

          <ConceptForm onGenerate={handleGenerate} loading={loading} />

          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">Generating concepts...</div>}
          {concepts.length > 0 && <ConceptCards concepts={concepts} />}
        </div>
      </div>
    </div>
  );
}
