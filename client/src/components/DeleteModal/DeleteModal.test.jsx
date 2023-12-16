import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteModal from './DeleteModal';

describe('DeleteModal Component', () => {
  it('renders when showModal is true', () => {
    render(<DeleteModal showModal={true} onConfirm={() => {}} onCancel={() => {}} />);
    expect(screen.getByText('Delete Confirmation')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
  });

  it('does not render when showModal is false', () => {
    render(<DeleteModal showModal={false} onConfirm={() => {}} onCancel={() => {}} />);
    expect(screen.queryByText('Delete Confirmation')).not.toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    const onConfirmMock = vi.fn();
    render(<DeleteModal showModal={true} onConfirm={onConfirmMock} onCancel={() => {}} />);

    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirmMock).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', () => {
    const onCancelMock = vi.fn();
    render(<DeleteModal showModal={true} onConfirm={() => {}} onCancel={onCancelMock} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancelMock).toHaveBeenCalled();
  });

  it('calls onCancel when clicking outside the modal content', () => {
    const onCancelMock = vi.fn();
    const { container } = render(<DeleteModal showModal={true} onConfirm={() => {}} onCancel={onCancelMock} />);
    
    fireEvent.click(container.firstChild);
    expect(onCancelMock).toHaveBeenCalled();
  });
});