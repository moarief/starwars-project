"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { clsx } from "clsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { DataTypeObject, SWADataTypes } from "@/lib/types";
import { useAppDispatch } from "@/lib/redux/hooks";
import { updateCategory } from "@/lib/redux/features/categorySlice";

const FormSchema = z.object({
  keyword: z.string({ description: "" }).min(2, {
    message: "Username must be at least 2 characters.",
  }),
  type: z.string(),
});

export function Search() {
  const dispatch = useAppDispatch();
  const route = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keyword: "",
      type: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(updateCategory(""));
    route.push(`/${data.type}?keyword=${data.keyword}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-fit space-y-6"
      >
        <div className="flex w-full max-w-lx items-center space-x-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue defaultValue={SWADataTypes[0].title} placeholder="Films" />
                </SelectTrigger>
                <SelectContent>
                  {SWADataTypes.map((item: DataTypeObject) => {
                    return (
                      <SelectItem key={item.id} value={item.id}>
                        {item.title}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <>
                <FormMessage className="!space-y-0 !m-0" />
                <FormControl>
                  <Input
                    data-testid="search-field"
                    className={clsx("w-auto", {
                      "border-red-500": form.formState.errors?.keyword,
                    })}
                    placeholder="Search keyword..."
                    {...field}
                    autoFocus
                  />
                </FormControl>

                <Button
                  data-testid="submit-button"
                  className="space-x-2"
                  type="submit"
                >
                  <SearchIcon size={"16"} />
                </Button>
              </>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
