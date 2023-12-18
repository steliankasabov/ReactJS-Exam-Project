// Importing the useState hook from React.
import { useState } from "react";

// A custom hook named useDeleteModal.
// Custom hooks in React are used to extract and reuse logic across different components.
export default function useDeleteModal() {
    // useState is used to maintain the visibility state of the delete modal.
    const [isModalVisible, setIsModalVisible] = useState(false);
    // useState is also used to keep track of the item that is to be deleted.
    const [itemToDelete, setItemToDelete] = useState(null);

    // Function to show the delete modal and set the item to be deleted.
    const showDeleteModal = (itemId) => {
        setItemToDelete(itemId); // Storing the ID of the item to delete.
        setIsModalVisible(true); // Showing the modal.
    };

    // Function to hide the delete modal and reset the itemToDelete.
    const hideDeleteModal = () => {
        setIsModalVisible(false); // Hiding the modal.
        setItemToDelete(null); // Resetting the itemToDelete state.
    };

    // Function to confirm the deletion of an item.
    // It takes a deleteAction function as a parameter.
    const confirmDeletion = (deleteAction) => {
        if (itemToDelete && deleteAction) {
            deleteAction(itemToDelete); // Executing the delete action with the item ID.
        }
        hideDeleteModal(); // Hiding the modal after deletion.
    };

    // Returning an object with the modal state and functions.
    return {
        isModalVisible,
        showDeleteModal,
        hideDeleteModal,
        confirmDeletion
    };
}