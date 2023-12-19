import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

vi.mock('../../components/PlayCarousel/PlayCarousel', () => ({
  default: () => <div>PlayCarousel Mock</div>,
}));

describe('Home Component', () => {
  it('renders the welcome image and play carousel', () => {
    render(<Home />);
    
    const image = screen.getByAltText('Sofia Park Theatre');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/slogan.png');
  });
});