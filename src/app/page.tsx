import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image with Next.js Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gym_bg.jpg"
          alt="Gym background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-70" />
      </div>

      {/* Admin link top right */}
      <div className="absolute top-6 right-8 z-10">
        <Link href="/adminLogin" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">
          Admin
        </Link>
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 drop-shadow-lg tracking-wide text-center">
          ec-fitness
        </h1>
        <div className="flex flex-col gap-4 w-48">
          <Link href="/register">
            <button className="w-full hover:cursor-pointer py-3 rounded-lg bg-green-500 text-white font-bold text-lg shadow hover:bg-green-600 transition">
              Register
            </button>
          </Link>
          <Link href="/login">
            <button className="w-full hover:cursor-pointer py-3 rounded-lg bg-indigo-600 text-white font-bold text-lg shadow hover:bg-indigo-700 transition">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
