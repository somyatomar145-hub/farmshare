
"use client";

import { useState } from "react";

type Equipment = {
  id: number;
  name: string;
  category: string;
  description: string | null;
  location: string | null;
  price_per_day: number;
};

export default function EquipmentList({
  equipment,
}: {
  equipment: Equipment[];
}) {
  const [selected, setSelected] = useState<Equipment | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const days =
    startDate && endDate && endDate > startDate
      ? Math.ceil(
          (new Date(endDate).getTime() -
            new Date(startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const total = selected ? days * selected.price_per_day : 0;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {equipment.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-green-100"
          >
            <div className="mb-4 text-4xl">🚜</div>
            <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
            <p className="mt-3 text-gray-600">
              {item.description || "Ready for farm work."}
            </p>
            <p className="mt-3 text-gray-600">
              📍 {item.location || "Location not specified"}
            </p>
            <p className="mt-4 text-2xl font-bold text-green-700">
              ₹{item.price_per_day}
              <span className="text-sm font-normal text-gray-500"> / day</span>
            </p>
            <button
              onClick={() => {
                setSelected(item);
                setStartDate("");
                setEndDate("");
              }}
              className="mt-5 w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white hover:bg-green-800"
            >
              Book Now
            </button>
          </article>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-green-800">
              Book {selected.name}
            </h2>
            <p className="mt-2 text-gray-600">
              Select your rental dates.
            </p>

            <label className="mt-5 block font-medium">Start date</label>
            <input
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-full rounded-lg border p-3"
            />

            <label className="mt-4 block font-medium">End date</label>
            <input
              type="date"
              min={startDate || new Date().toLocaleDateString("en-CA")}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 w-full rounded-lg border p-3"
            />

            <div className="mt-5 rounded-lg bg-green-50 p-4">
              <p>Rental days: {days}</p>
              <p className="mt-1 text-xl font-bold text-green-800">
                Total: ₹{total}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                End date is exclusive; the end date itself is not charged.
              </p>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Booking submission will be connected next.
            </p>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setSelected(null)}
                className="flex-1 rounded-lg border px-4 py-3 font-semibold"
              >
                Close
              </button>
              <button
                disabled={days <= 0}
                onClick={() =>
                  alert(
                    `Dates selected for ${selected.name}. Total: ₹${total}. We'll connect submission next.`
                  )
                }
                className="flex-1 rounded-lg bg-green-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}