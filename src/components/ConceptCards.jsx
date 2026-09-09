import { useState } from 'react';

export default function ConceptCards({ concepts }) {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="concepts-grid">
      {concepts.map((concept, index) => (
        <div key={index} className="concept-card">
          <div className="concept-header" onClick={() => toggleExpand(index)}>
            <h3>{concept.title}</h3>
            <span className="expand-icon">{expanded === index ? '−' : '+'}</span>
          </div>

          <p className="pitch">{concept.pitch}</p>

          {expanded === index && (
            <div className="concept-details">
              <div>
                <strong>Mechanics:</strong> {concept.mechanics}
              </div>
              <div>
                <strong>Target Audience:</strong> {concept.target_audience}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
