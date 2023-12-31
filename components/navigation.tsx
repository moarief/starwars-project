"use client";
import { Button } from "./ui/button";
import Image from "next/image";
import { updateCategory } from "@/lib/redux/features/categorySlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { ModeToggle } from "./switcher";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DataTypeObject, SWADataTypes } from "@/lib/types";

export const Navigation = () => {
  const category = useAppSelector((state) => state.categoryReducer.value);
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

      <div className="flex gap-3">
        {SWADataTypes.map((item: DataTypeObject) => {
          const getSelected = () =>
            category === item.id ? "default" : "ghost";
          return (
            <Button
              key={item.id}
              onClick={() => {
                handleRoute(), dispatch(updateCategory(item.id));
              }}
              variant={getSelected()}
            >
              <span>{item.title}</span>
            </Button>
          );
        })}
        <Button onClick={() => route.push("/favourite")} variant="ghost">
          <span>Favourites</span>
        </Button>
      </div>
      <ModeToggle />
    </div>
  );
};
