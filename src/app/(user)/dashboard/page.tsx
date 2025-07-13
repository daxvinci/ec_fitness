"use client";

const Dashboard = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
      <p className="text-lg text-gray-700">
        You signed in successfully on {today}.
      </p>
    </div>
  );
};

export default Dashboard;
