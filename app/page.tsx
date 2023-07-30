"use client";

import { List } from "@/components/list";
import { useAppSelector } from "@/lib/redux/hooks";

export default function Home() {
  const category = useAppSelector((state) => state.categoryReducer.value);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex flex-col space-y-10 w-full max-w-6xl items-center justify-between font-mono text-sm lg:flex">
        <List category={category} />
      </div>
    </main>
  );
}
