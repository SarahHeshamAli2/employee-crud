import Button from "./button";
import Modal from "./modal";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete"
      className="w-full max-w-sm rounded-lg bg-white shadow-xl"
      footer={
        <>
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}>
            Delete
          </Button>
        </>
      }>
      <p className="text-sm text-gray-600">
        Are you sure you want to delete{" "}
        {itemName ? <span className="font-bold">{itemName}</span> : "this item"}
        ? This action cannot be undone.
      </p>
    </Modal>
  );
}
