
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Hello, Tailwind!</h1>
        <p className="mt-4 text-gray-600">
          This is a simple example of using Tailwind CSS in a Next.js project.
        </p>
      </div>
    </div>
    </>
  );
}

