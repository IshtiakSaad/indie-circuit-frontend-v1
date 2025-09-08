'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect based on role (fetch from AuthContext user)
      router.push('/dashboard/mentee'); // default, or you can check role
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm mx-auto mt-10">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="p-3 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="p-3 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
