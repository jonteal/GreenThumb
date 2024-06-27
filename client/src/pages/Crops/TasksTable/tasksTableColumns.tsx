import { Button } from "@/components/ui/button";
import { TaskType } from "@/services/crop/types";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export const TasksTableColumns: ColumnDef<TaskType>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "day",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Day
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        to={`/crops/${row.original.taskId}`}
        className="capitalize text-left hover:underline w-full"
      >
        {row.getValue("day")}
      </Link>
    ),
  },
  {
    accessorKey: "task",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-left w-full">{row.getValue("task")}</div>
    ),
  },
  {
    accessorKey: "info",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Info
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-left w-full">{row.getValue("info")}</div>
    ),
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     //   const task = row.original;
  //     //   const navigate = useNavigate();

  //     return (
  //       <>
  //         <div className="flex flex-row">
  //           <Pencil
  //             //   onClick={() =>
  //             //     navigate(`/crm/customer/${customer.customerId}/edit`)
  //             //   }
  //             className="text-green-600 text-sm mr-2"
  //           />
  //           <Trash2 className="text-red-600 text-sm" />
  //         </div>
  //       </>
  //     );
  //   },
  // },
];
