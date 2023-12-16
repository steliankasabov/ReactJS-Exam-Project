import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Favourites from './Favourites';
import AuthContext from '../../contexts/authContext';

describe('Favourites Component', () => {
    it('renders without crashing', () => {
        render(
            <AuthContext.Provider value={{ userId: 'test-user-id' }}>
                <Favourites />
            </AuthContext.Provider>
        );
        expect(screen.getByText('Your Favourites')).toBeInTheDocument();
    });
});