'use client';
import ProtectedPage from '@/components/ProtectedPage';
import SlotCard from '@/components/SlotCard';
import MentorCard from '@/components/MentorCard';
import { useState } from 'react';

const mockMentors = [
  { name: 'Alice Johnson', field: 'Computer Science', rating: 4.8 },
  { name: 'Bob Smith', field: 'Mechanical Engineering', rating: 4.5 },
];

const mockSlots = [
  { mentorName: 'Alice Johnson', time: 'Sep 10, 10:00 AM', available: true },
  { mentorName: 'Alice Johnson', time: 'Sep 11, 2:00 PM', available: false },
  { mentorName: 'Bob Smith', time: 'Sep 12, 11:00 AM', available: true },
];

export default function MenteeDashboard() {
  const [slots, setSlots] = useState(mockSlots);

  const handleBook = (index: number) => {
    const newSlots = [...slots];
    newSlots[index].available = false;
    setSlots(newSlots);
    alert('Slot booked successfully!');
  };

  return (
    <ProtectedPage>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Available Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {mockMentors.map((mentor, idx) => (
            <MentorCard key={idx} {...mentor} />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.map((slot, idx) => (
            <SlotCard
              key={idx}
              {...slot}
              onBook={slot.available ? () => handleBook(idx) : undefined}
            />
          ))}
        </div>
      </div>
    </ProtectedPage>
  );
}
