'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'mentee' | 'mentor' | 'alumni' | 'intern' | 'freelancer'>('mentee');
  const [field, setField] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!name || !email || !password || !field) {
        setError('Please fill all fields');
        return;
      }
      await signup(name, email, password, role, field);
      router.push('/dashboard/' + (role === 'mentee' ? 'mentee' : 'mentor'));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm mx-auto mt-10">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="p-3 border rounded"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        className="p-3 border rounded"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        className="p-3 border rounded"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
        className="p-3 border rounded"
      >
        <option value="mentee">Junior (Mentee)</option>
        <option value="mentor">Senior (Mentor)</option>
        <option value="alumni">Alumni</option>
        <option value="intern">Intern</option>
        <option value="freelancer">Freelancer</option>
      </select>

      <input
        value={field}
        onChange={(e) => setField(e.target.value)}
        placeholder="Field (e.g., Computer Science)"
        className="p-3 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
      >
        Signup
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
