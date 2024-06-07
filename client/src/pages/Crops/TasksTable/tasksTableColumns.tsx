import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TaskType } from "@/services/task/types";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const TasksTableColumns: ColumnDef<TaskType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
        to={`/crm/customer/${row.original.taskId}`}
        className="capitalize text-left hover:underline"
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
      <div className="capitalize text-left">{row.getValue("task")}</div>
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
      <div className="capitalize text-left">{row.getValue("info")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;
      const navigate = useNavigate();

      return (
        <>
          {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigate(`/customer/${customer.customerId}`)}
            >
              Details
            </DropdownMenuItem>
            <DropdownMenuItem
            // onClick={}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
          {/* <Button
            className="bg-blue-600 text-neutral-50 mr-1"
            onClick={() => navigate(`/crm/customer/${customer.customerId}`)}
          >
            Details
          </Button> */}
          <Button className="bg-red-600 text-neutral-50">Delete</Button>
          <Button
            className="bg-green-600 text-neutral-50 ml-1"
            // onClick={() =>
            //   navigate(`/crm/customer/${customer.customerId}/edit`)
            // }
          >
            Edit
          </Button>
        </>
      );
    },
  },
];
