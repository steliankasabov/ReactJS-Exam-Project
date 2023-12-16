import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Booking from './Booking';
import * as playService from '../../services/playService';
import * as reservationService from '../../services/reservationService';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../services/playService');
vi.mock('../../services/reservationService');

beforeEach(() => {
  playService.getOne.mockResolvedValue({ price: 10 });
  reservationService.getPlaySeats.mockResolvedValue(['1A', '1B']);
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
      await waitFor(() => expect(playService.getOne).toHaveBeenCalled());
      expect(reservationService.getPlaySeats).toHaveBeenCalled();
    });
  });