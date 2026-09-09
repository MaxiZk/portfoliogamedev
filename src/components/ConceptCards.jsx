import { useState } from 'react';

export default function ConceptCards({ concepts }) {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand(index);
    }
  };

  return (
    <div className="concepts-grid">
      {concepts.map((concept, index) => {
        const isOpen = expanded === index;
        const detailsId = `concept-details-${index}`;

        return (
          <div key={index} className="concept-card">
            <div
              className="concept-header"
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={detailsId}
              aria-label={`${concept.title} - ${isOpen ? 'collapse' : 'expand'}`}
              onClick={() => toggleExpand(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <h3>{concept.title}</h3>
              <span className="expand-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </div>

            <p className="pitch">{concept.pitch}</p>

            {isOpen && (
              <div className="concept-details" id={detailsId}>
                <div>
                  <strong>Mechanics:</strong> {concept.mechanics}
                </div>
                <div>
                  <strong>Target Audience:</strong> {concept.target_audience}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
