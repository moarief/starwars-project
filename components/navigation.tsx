"use client";
import { Button } from "./ui/button";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Link from "next/link";

export const Navigation = () => {
  const route = useRouter();

  return (
    <div className="flex space-x-10 align-middle">
      <Link href={"/"} prefetch>
        <Image
          className="relative"
          src="/star-wars-4-logo-svg-vector.svg"
          alt="Disney Logo"
          width={79}
          height={10}
          priority
        />
      </Link>

      <div className="flex gap-1">
        <Button variant="ghost">
          <span>Films</span>
        </Button>
        <Button variant="ghost">
          <span>People</span>
        </Button>
        <Button variant="ghost">
          <span>Species</span>
        </Button>
        <Button onClick={() => route.push("/favourite")} variant="ghost">
          <span>Favourites</span>
        </Button>
      </div>
    </div>
  );
};
