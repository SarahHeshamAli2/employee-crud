import Button from "./button";
import Modal from "./modal";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  isLoading?: boolean;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete"
      className="w-full max-w-sm rounded-lg bg-white shadow-xl"
      footer={
        <>
          <Button
            disabled={isLoading}
            variant="outline"
            type="button"
            onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} variant="danger" onClick={onConfirm}>
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
