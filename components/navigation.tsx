"use client";
import { Button } from "./ui/button";
import Image from "next/image";
import { update } from "@/lib/redux/features/categorySlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { ModeToggle } from "./switcher";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();

  const handleRoute = () => {
    route.push("/");
  };

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
        <Button
          onClick={() => {
            handleRoute(), dispatch(update("films"));
          }}
          variant="ghost"
        >
          <span>Films</span>
        </Button>
        <Button
          onClick={() => {
            handleRoute(), dispatch(update("people"));
          }}
          variant="ghost"
        >
          <span>People</span>
        </Button>
        <Button
          onClick={() => {
            handleRoute(), dispatch(update("species"));
          }}
          variant="ghost"
        >
          <span>Species</span>
        </Button>
        <Button onClick={() => route.push("/favourite")} variant="ghost">
          <span>Favourites</span>
        </Button>
      </div>
      <ModeToggle />
    </div>
  );
};
