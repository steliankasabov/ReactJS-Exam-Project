// Importing CSS module for styling the modal.
import styles from './DeleteModal.module.css';

// DeleteModal component definition.
// It takes three props: 
// showModal - a boolean indicating whether the modal should be shown.
// onConfirm - a function to execute when the deletion is confirmed.
// onCancel - a function to call when the modal is closed without confirming deletion.
export default function DeleteModal({ showModal, onConfirm, onCancel }) {
     // If showModal is false, the modal is not rendered.
     if (!showModal) return null;

    // Function to handle clicks on the modal background.
    // It checks if the clicked element is the modal background itself.
    // If so, it calls the onCancel function, closing the modal.
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    // Rendering the modal.
    return (
        <div className={styles.modalBackground} onClick={handleBackgroundClick}>
            <div className={styles.modalContent}>
                <h2>Delete Confirmation</h2>
                <p>Are you sure you want to delete this item?</p>
                <button className={styles.deleteButton} onClick={onConfirm}>Confirm</button>
                <button className={styles.cancelButton} onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}