import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import type { PackagesType } from "@/services/products/types";

export const PackagesTableColumns: ColumnDef<PackagesType>[] = [
  {
    accessorKey: "active",
    header: () => {
      return <Button variant="ghost">Active</Button>;
    },
    cell: ({ row }) => (
      <div className="capitalize text-left">
        {row.getValue("active") ? (
          <Badge className="bg-green-600">Active</Badge>
        ) : (
          <Badge className="bg-red-400">Inactive</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "size",
    header: () => {
      return <Button variant="ghost">Size</Button>;
    },
    cell: ({ row }) => (
      <div className="capitalize text-left">{row.getValue("size")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => {
      return <Button variant="ghost">Price</Button>;
    },
    cell: ({ row }) => (
      <div className="capitalize text-left">${row.getValue("price")}</div>
    ),
  },
];
