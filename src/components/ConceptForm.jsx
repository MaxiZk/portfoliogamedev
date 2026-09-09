import { useState } from 'react';

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
        <label htmlFor="genre-select">Genre</label>
        <select 
          id="genre-select"
          name="genre" 
          value={formData.genre} 
          onChange={handleChange}
        >
          <option>Action</option>
          <option>Puzzle</option>
          <option>RPG</option>
          <option>Survival</option>
          <option>Narrative</option>
          <option>Platformer</option>
          <option>Roguelike</option>
          <option>Strategy</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="mood-select">Mood</label>
        <select 
          id="mood-select"
          name="mood" 
          value={formData.mood} 
          onChange={handleChange}
        >
          <option>Dark</option>
          <option>Playful</option>
          <option>Epic</option>
          <option>Mysterious</option>
          <option>Minimalist</option>
          <option>Cyberpunk</option>
          <option>Noir</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="mechanic-input">Core Mechanic</label>
        <input
          id="mechanic-input"
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
