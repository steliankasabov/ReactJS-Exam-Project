import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reservations from './Reservations';
import * as reservationService from '../../services/reservationService';
import AuthContext from '../../contexts/authContext';

vi.mock('../../services/reservationService');

describe('Reservations Component', () => {
    const mockReservations = [
        { _id: '1' },
        { _id: '2' }
    ];

    beforeEach(() => {
        reservationService.getReservations.mockResolvedValue(mockReservations);
    });

    it('handles no reservations case', async () => {
        reservationService.getReservations.mockResolvedValue([]);
        render(
            <AuthContext.Provider value={{ userId: 'test-user-id' }}>
                <Reservations />
            </AuthContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('You have no reservations.')).toBeInTheDocument();
        });
    });
});