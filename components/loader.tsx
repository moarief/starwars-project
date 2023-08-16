import { JSX } from "react";
import { Skeleton } from "./ui/skeleton";

type LoaderProps = {
  total: number;
};

export const Loader = ({ total }: LoaderProps): JSX.Element => {
  const elementsArray: JSX.Element[] = [];

  for (let i = 0; i < 10; i++) {
    elementsArray.push(
      <div
        key={i}
        className="flex border rounded-md w-[370px] h-[200px] p-4 space-y-2"
      >
        <div className="flex flex-col justify-between w-full">
          <div className="space-y-2">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-10">
      <div className="space-y-2">
        <Skeleton className="h-10 w-52" />
        <Skeleton className="h-1 w-full" />
      </div>
      <div className="flex flex-row flex-wrap gap-5">{elementsArray}</div>
    </div>
  );
};
