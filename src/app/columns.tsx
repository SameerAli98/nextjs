"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: (props) => (
      <div className="flex items-center justify-center w-16 h-16">
        <img
          src={String(props.cell.getValue()) || ""}
          alt="Product"
          className="w-fit h-fit object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "reviews",
    header: "Reviews",
  },
  {
    accessorKey: "scrapeDatetime",
    header: "As of",
  },
];
