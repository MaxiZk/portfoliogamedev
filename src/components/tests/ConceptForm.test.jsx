import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConceptForm from '../ConceptForm';

describe('ConceptForm', () => {
  it('renders all form fields', () => {
    const mockOnGenerate = vi.fn();
    render(<ConceptForm onGenerate={mockOnGenerate} loading={false} />);

    expect(screen.getByLabelText('Genre')).toBeInTheDocument();
    expect(screen.getByLabelText('Mood')).toBeInTheDocument();
    expect(screen.getByLabelText('Core Mechanic')).toBeInTheDocument();
  });

  it('updates form state on input change', () => {
    const mockOnGenerate = vi.fn();
    render(<ConceptForm onGenerate={mockOnGenerate} loading={false} />);

    const genreSelect = screen.getByLabelText('Genre');
    fireEvent.change(genreSelect, { target: { value: 'RPG' } });

    expect(genreSelect.value).toBe('RPG');
  });

  it('calls onGenerate with form data on submit', () => {
    const mockOnGenerate = vi.fn();
    render(<ConceptForm onGenerate={mockOnGenerate} loading={false} />);

    const submitButton = screen.getByRole('button', { name: /Generate Concepts/i });
    fireEvent.click(submitButton);

    expect(mockOnGenerate).toHaveBeenCalledWith({
      genre: 'Action',
      mood: 'Dark',
      mechanic: 'Turn-based combat',
    });
  });

  it('disables button when loading', () => {
    const mockOnGenerate = vi.fn();
    render(<ConceptForm onGenerate={mockOnGenerate} loading={true} />);

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
  });

  it('shows "Generating..." text when loading', () => {
    const mockOnGenerate = vi.fn();
    render(<ConceptForm onGenerate={mockOnGenerate} loading={true} />);

    expect(screen.getByText('Generating...')).toBeInTheDocument();
  });
});
