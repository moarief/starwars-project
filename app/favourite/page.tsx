"use client";

import { ListItem } from "@/components/listItem";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex flex-col space-y-10 w-full max-w-6xl justify-between font-mono text-sm lg:flex">
        {/* <ListItem
          isLoading={isLoading}
          isFetching={isFetching}
          data={data}
          error={error}
          title={"Result"}
          total={0}
        /> */}
      </div>
    </main>
  );
}
