'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '@/firebase'; // Make sure your Firebase instance is imported

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'mentee' | 'mentor' | 'alumni' | 'intern' | 'freelancer'>('mentee');
  const [field, setField] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !field) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Firebase signup
      const userCredential = await signup(name, email, password, role, field);
    //   console.log(userCredential.user.uid);
      const uid = userCredential.user.uid;

      // 2️⃣ Post user to backend immediately
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: uid, // Firebase UID
          name,
          email,
          role,
          field,
        }),
      });


        if (!res.ok) {
        const text = await res.text();

        if (text.includes("User already exists")) {
            console.warn("Backend user already exists, skipping creation");
        } else {
            throw new Error(`Backend user creation failed: ${text}`);
        }
        }

      // 3️⃣ Redirect based on role
      router.push('/dashboard/' + (role === 'mentee' ? 'mentee' : 'mentor'));

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm mx-auto mt-10">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        className="p-3 border rounded"
        autoComplete="name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        className="p-3 border rounded"
        autoComplete="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        className="p-3 border rounded"
        autoComplete="new-password"
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
        autoComplete="organization"
      />

      <button
        type="submit"
        className={`bg-blue-500 text-white p-3 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Signup'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
