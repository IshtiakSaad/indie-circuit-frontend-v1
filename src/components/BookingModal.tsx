interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorName: string;
  time: string;
  onConfirm: () => void;
}

export default function BookingModal({ isOpen, onClose, mentorName, time, onConfirm }: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
        <p className="mb-2">Mentor: {mentorName}</p>
        <p className="mb-4">Time: {time}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
