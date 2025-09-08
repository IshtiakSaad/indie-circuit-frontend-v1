'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login'); // redirect after logout
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        IndieCircuit
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="font-medium text-gray-700">{user.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
