import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

vi.mock('../../components/PlayCarousel/PlayCarousel', () => ({
  default: () => <div>PlayCarousel Mock</div>,
}));

describe('Home Component', () => {
  it('renders the welcome message and play carousel', () => {
    render(<Home />);
    
    expect(screen.getByText(/welcome to ReactCineX/i)).toBeInTheDocument();

    expect(screen.getByText(/discover some of the best plays and book your reservations/i)).toBeInTheDocument();

    expect(screen.getByText('PlayCarousel Mock')).toBeInTheDocument();
  });
});