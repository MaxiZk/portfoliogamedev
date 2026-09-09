import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConceptCards from '../ConceptCards';

describe('ConceptCards', () => {
  const mockConcepts = [
    {
      title: 'Test Game 1',
      pitch: 'A test game concept',
      mechanics: 'Turn-based combat',
      target_audience: 'Hardcore gamers',
    },
    {
      title: 'Test Game 2',
      pitch: 'Another test concept',
      mechanics: 'Real-time strategy',
      target_audience: 'Casual players',
    },
  ];

  it('renders all concepts with title and pitch', () => {
    render(<ConceptCards concepts={mockConcepts} />);

    expect(screen.getByText('Test Game 1')).toBeInTheDocument();
    expect(screen.getByText('A test game concept')).toBeInTheDocument();
    expect(screen.getByText('Test Game 2')).toBeInTheDocument();
  });

  it('hides details by default', () => {
    render(<ConceptCards concepts={mockConcepts} />);

    expect(screen.queryByText('Turn-based combat')).not.toBeInTheDocument();
  });

  it('expands details on click', () => {
    render(<ConceptCards concepts={mockConcepts} />);

    const firstHeader = screen.getByLabelText(/Test Game 1 - expand/i);
    fireEvent.click(firstHeader);

    expect(screen.getByText('Turn-based combat')).toBeInTheDocument();
    expect(screen.getByText('Hardcore gamers')).toBeInTheDocument();
  });

  it('collapses details on second click', () => {
    render(<ConceptCards concepts={mockConcepts} />);

    const firstHeader = screen.getByLabelText(/Test Game 1/i);
    fireEvent.click(firstHeader);
    expect(screen.getByText('Turn-based combat')).toBeInTheDocument();

    fireEvent.click(firstHeader);
    expect(screen.queryByText('Turn-based combat')).not.toBeInTheDocument();
  });

  it('supports keyboard expansion (Enter key)', () => {
    render(<ConceptCards concepts={mockConcepts} />);

    const firstHeader = screen.getByLabelText(/Test Game 1/i);
    fireEvent.keyDown(firstHeader, { key: 'Enter' });

    expect(screen.getByText('Turn-based combat')).toBeInTheDocument();
  });

  it('supports keyboard expansion (Space key)', () => {
    render(<ConceptCards concepts={mockConcepts} />);

    const firstHeader = screen.getByLabelText(/Test Game 1/i);
    fireEvent.keyDown(firstHeader, { key: ' ' });

    expect(screen.getByText('Turn-based combat')).toBeInTheDocument();
  });

  it('has aria-expanded set correctly', () => {
    render(<ConceptCards concepts={mockConcepts} />);

    const firstHeader = screen.getByLabelText(/Test Game 1/i);
    expect(firstHeader).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(firstHeader);
    expect(firstHeader).toHaveAttribute('aria-expanded', 'true');
  });
});
