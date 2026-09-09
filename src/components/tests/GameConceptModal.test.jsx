import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GameConceptModal from '../GameConceptModal';
import { generateConcepts } from '../../lib/claude';

vi.mock('../../lib/claude', () => ({
  generateConcepts: vi.fn(),
}));

describe('GameConceptModal', () => {
  beforeEach(() => {
    generateConcepts.mockReset();
  });

  it('renders as an accessible dialog and focuses the first control', () => {
    render(<GameConceptModal onClose={vi.fn()} />);

    const dialog = screen.getByRole('dialog', { name: /Game Concept Generator/i });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
  });

  it('closes on Escape key', () => {
    const onClose = vi.fn();
    render(<GameConceptModal onClose={onClose} />);

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when clicking the overlay but not the dialog body', () => {
    const onClose = vi.fn();
    render(<GameConceptModal onClose={onClose} />);

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog').parentElement);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps Tab focus inside the dialog', () => {
    render(<GameConceptModal onClose={vi.fn()} />);

    const closeBtn = screen.getByRole('button', { name: 'Close' });
    const generateBtn = screen.getByRole('button', { name: /Generate Concepts/i });

    generateBtn.focus();
    fireEvent.keyDown(generateBtn, { key: 'Tab' });
    expect(closeBtn).toHaveFocus();

    fireEvent.keyDown(closeBtn, { key: 'Tab', shiftKey: true });
    expect(generateBtn).toHaveFocus();
  });

  it('renders generated concepts', async () => {
    generateConcepts.mockResolvedValue([
      { title: 'Neon Drift', pitch: 'Race the night', mechanics: 'Drift', target_audience: 'Arcade fans' },
    ]);
    render(<GameConceptModal onClose={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /Generate Concepts/i }));

    expect(await screen.findByText('Neon Drift')).toBeInTheDocument();
    expect(generateConcepts).toHaveBeenCalledWith({
      genre: 'Action',
      mood: 'Dark',
      mechanic: 'Turn-based combat',
    });
  });

  it('shows an error message when generation fails', async () => {
    generateConcepts.mockRejectedValue(new Error('Boom'));
    render(<GameConceptModal onClose={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /Generate Concepts/i }));

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Boom'));
  });
});
