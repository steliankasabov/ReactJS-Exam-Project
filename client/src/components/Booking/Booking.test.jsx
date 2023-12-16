import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Booking from './Booking';
import * as movieService from '../../services/movieService';
import * as reservationService from '../../services/reservationService';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../services/movieService');
vi.mock('../../services/reservationService');

beforeEach(() => {
  movieService.getOne.mockResolvedValue({ price: 10 });
  reservationService.getMovieSeats.mockResolvedValue(['1A', '1B']);
  reservationService.addReservation.mockResolvedValue({});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Booking Component', () => {
    it('fetches movie price and reserved seats on mount', async () => {
       render(
      <BrowserRouter>
        <Booking />
      </BrowserRouter>
    );
      await waitFor(() => expect(movieService.getOne).toHaveBeenCalled());
      expect(reservationService.getMovieSeats).toHaveBeenCalled();
    });
  });