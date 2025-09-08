'use client';
import { useState } from 'react';
import SlotCard from '@/components/SlotCard';

const mockSlots = [
  { mentorName: 'You', time: 'Sep 10, 10:00 AM', available: true },
  { mentorName: 'You', time: 'Sep 11, 2:00 PM', available: true },
];

export default function MentorDashboard() {
  const [slots, setSlots] = useState(mockSlots);
  const [newTime, setNewTime] = useState('');

  const handleAddSlot = () => {
    if (!newTime) return;
    setSlots([...slots, { mentorName: 'You', time: newTime, available: true }]);
    setNewTime('');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Slots</h2>

      <div className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="New slot time (e.g. Sep 15, 3:00 PM)"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="p-2 border rounded flex-1"
        />
        <button
          onClick={handleAddSlot}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Slot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot, idx) => (
          <SlotCard key={idx} {...slot} />
        ))}
      </div>
    </div>
  );
}
