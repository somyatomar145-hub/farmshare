
import { Suspense } from "react";
import { supabase } from "../lib/supabase";
import EquipmentList from "./EquipmentList";

function LoadingEquipment() {
  return (
    <p className="rounded-lg bg-white p-6 text-gray-600">
      Loading farm equipment...
    </p>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-green-50 p-8">
      <header className="mx-auto max-w-6xl py-8">
        <h1 className="text-4xl font-bold text-green-800">
          FarmShare 🌾
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Affordable farm equipment, shared by farmers.
        </p>
      </header>

      <section className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Available Equipment
        </h2>

        <Suspense fallback={<LoadingEquipment />}>
          <EquipmentData />
        </Suspense>
      </section>
    </main>
  );
}

async function EquipmentData() {
  const { data: equipment, error } = await supabase
    .from("equipment")
    .select(
      "id, name, category, description, location, price_per_day, status"
    )
    .eq("status", "available")
    .order("price_per_day", { ascending: true });

  if (error) {
    return (
      <p className="rounded-lg bg-red-100 p-4 text-red-700">
        Could not load equipment. Check your Supabase connection.
      </p>
    );
  }

  return <EquipmentList equipment={equipment ?? []} />;
}