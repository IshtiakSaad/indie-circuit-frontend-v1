import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to IndieCircuit</h1>
      <p className="mb-6">Connect with senior mentors in your field for free career guidance.</p>
      <div className="space-x-4">
        <Link href="/signup" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Get Started</Link>
        <Link href="/login" className="bg-gray-200 text-gray-900 px-6 py-3 rounded hover:bg-gray-300">Login</Link>
      </div>
    </div>
  );
}
