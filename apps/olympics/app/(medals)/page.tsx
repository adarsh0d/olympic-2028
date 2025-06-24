import Link from 'next/link';

export default function MedalsLandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Olympic Medals App</h1>
      <p className="mb-6 text-lg text-gray-700">Explore the medal standings and more.</p>
      <Link href="/medals/table">
        <span className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors cursor-pointer">
          View Medals Table
        </span>
      </Link>
    </div>
  );
}
