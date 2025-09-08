interface SlotCardProps {
  mentorName: string;
  time: string;
  available: boolean;
  onBook?: () => void;
}

export default function SlotCard({ mentorName, time, available, onBook }: SlotCardProps) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition cursor-pointer bg-white">
      <h3 className="font-bold">{mentorName}</h3>
      <p className="text-gray-600">Time: {time}</p>
      <p className={`font-semibold ${available ? 'text-green-500' : 'text-red-500'}`}>
        {available ? 'Available' : 'Booked'}
      </p>
      {available && onBook && (
        <button
          onClick={onBook}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Book
        </button>
      )}
    </div>
  );
}
