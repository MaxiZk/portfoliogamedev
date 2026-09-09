import { useState } from 'react';

const GENRES = ['Action', 'Puzzle', 'RPG', 'Survival', 'Narrative', 'Platformer', 'Roguelike', 'Strategy'];
const MOODS = ['Dark', 'Playful', 'Epic', 'Mysterious', 'Minimalist', 'Cyberpunk', 'Noir'];

export default function ConceptForm({ onGenerate, loading }) {
  const [formData, setFormData] = useState({
    genre: 'Action',
    mood: 'Dark',
    mechanic: 'Turn-based combat',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="concept-form">
      <div className="form-group">
        <label htmlFor="concept-genre">Genre</label>
        <select id="concept-genre" name="genre" value={formData.genre} onChange={handleChange}>
          {GENRES.map((g) => <option key={g}>{g}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="concept-mood">Mood</label>
        <select id="concept-mood" name="mood" value={formData.mood} onChange={handleChange}>
          {MOODS.map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="concept-mechanic">Core Mechanic</label>
        <input
          id="concept-mechanic"
          type="text"
          name="mechanic"
          value={formData.mechanic}
          onChange={handleChange}
          placeholder="e.g., time manipulation, resource management"
        />
      </div>

      <button type="submit" disabled={loading} className="generate-btn">
        {loading ? 'Generating...' : 'Generate Concepts'}
      </button>
    </form>
  );
}
