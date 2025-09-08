interface MentorCardProps {
  name: string;
  field: string;
  rating: number;
}

export default function MentorCard({ name, field, rating }: MentorCardProps) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition bg-white">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-gray-600">{field}</p>
      <p className="text-yellow-500">⭐ {rating.toFixed(1)}</p>
    </div>
  );
}
