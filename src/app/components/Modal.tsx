import React from "react";
import { ModalProps } from "../lib/types";

export default function Modal({ open, onClose, startDate, endDate, onSet }:ModalProps) {
  const [newStartDate, setNewStartDate] = React.useState(startDate);
  const [newEndDate, setNewEndDate] = React.useState(endDate);

  React.useEffect(() => {
    setNewStartDate(startDate);
    setNewEndDate(endDate);
  }, [startDate, endDate, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Update Dates</h2>
        <label>
          Start Date:
          <input
            type="date"
            value={newStartDate?.slice(0, 10)}
            onChange={e => setNewStartDate(e.target.value)}
            className="block border p-2 mb-2"
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={newEndDate?.slice(0, 10)}
            onChange={e => setNewEndDate(e.target.value)}
            className="block border p-2 mb-4"
          />
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onSet(
                new Date(newStartDate).toISOString(),
                new Date(newEndDate).toISOString())}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Set
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
