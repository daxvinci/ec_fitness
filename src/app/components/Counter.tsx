"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CounterProps } from "../lib/types";

const Counter = () => {
  const [current, setCurrent] = useState(0); // people currently in gym
  const [total, setTotal] = useState(0); // total people today

   useEffect(() => {
     const fetchData = async () => {
       try {
         const res = await axios.get<CounterProps>("/api/counter");
         setCurrent(res.data.current);
         setTotal(res.data.total);
       } catch (error) {
         console.error("Error fetching count:", error);
       }
     };

     fetchData();
   }, []);

   const handleIncrement = async () => {
     const prevCurrent = current;
     const prevTotal = total;

     // Optimistic update
     setCurrent((c) => c + 1);
     setTotal((t) => t + 1);

     try {
       const res = await axios.post<CounterProps>("/api/counter", {
         type: "in",
       });
       // Optionally update state with confirmed values from server
       setCurrent(res.data.current);
       setTotal(res.data.total);
     } catch (error) {
       // Rollback on error
       setCurrent(prevCurrent);
       setTotal(prevTotal);
       console.error("Increment failed:", error);
     }
   };

   const handleDecrement = async () => {
     if (current === 0) return; // Optional safeguard

     const prevCurrent = current;
     const prevTotal = total;

     // Optimistic update
     setCurrent((c) => c - 1);

     try {
       const res = await axios.post<CounterProps>("/api/counter", {
         type: "out",
       });
       setCurrent(res.data.current);
       setTotal(res.data.total);
     } catch (error) {
       // Rollback on error
       setCurrent(prevCurrent);
       setTotal(prevTotal);
       console.error("Decrement failed:", error);
     }
   };

  return (
    <div className="flex flex-col items-center justify-center py-6 gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-48 h-48 rounded-full shadow-2xl bg-white flex items-center justify-center text-5xl font-bold text-gray-800">
          {current}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleDecrement}
            className="px-4 py-2 hover:cursor-pointer text-2xl bg-red-500 text-white rounded-full shadow hover:bg-red-600"
          >
            –
          </button>
          <button
            onClick={handleIncrement}
            className="px-4 py-2 hover:cursor-pointer text-2xl bg-green-500 text-white rounded-full shadow hover:bg-green-600"
          >
            +
          </button>
        </div>
      </div>

      <div className="text-center text-lg font-medium text-gray-700 space-y-2">
        <p>
          People currently in the gym:{" "}
          <span className="font-bold">{current}</span>
        </p>
        <p>
          Total members today: <span className="font-bold">{total}</span>
        </p>
      </div>
    </div>
  );
};

export default Counter;
