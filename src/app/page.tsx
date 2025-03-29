import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Inventory Management System</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        A simple and efficient way to manage your inventory items, track stock levels, and maintain your business data.
      </p>
      <Link
        href="/inventory"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        View Inventory
      </Link>
    </div>
  );
}