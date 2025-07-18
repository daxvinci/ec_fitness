import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo and Dashboard */}
          <div className="flex items-center">
            <div className="shrink-0">
              <Image
                width={20}
                height={20}
                className="size-8"
                src="/images/default avatar illustration.jpg"
                alt="EC Fitness Logo"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <h1 className="text-2xl font-bold text-gray-200">
                  Gym Management Dashboard
                </h1>
              </div>
            </div>
          </div>

          {/* Center - Gym Name */}
          <div className="flex items-center">
            <h1 className="text-white text-xl font-bold">EC Fitness</h1>
          </div>

          {/* Right side - Sign Out and Profile Pic */}
          <div className="flex items-center">
            <button className="text-gray-300 hover:cursor-pointer hover:text-white px-3 py-2 text-sm font-medium">
              Sign Out
            </button>
            <div className="ml-4">
              <Image
                width={20}
                height={20}
                className="size-8 rounded-full"
                src="/images/default avatar illustration.jpg"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
