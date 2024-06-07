import { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { GrowScheduleListType } from "@/services/crop/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type TasksProps = {
  tasks: GrowScheduleListType;
  deleteTask?: (task: GrowScheduleListType) => void;
};

export const Tasks = ({ tasks, deleteTask }: TasksProps) => {
  //   const [edit, setEdit] = useState({
  //     id: null,
  //     value: "",
  //   });

  //   const submitUpdate = (value) => {
  //     updateTodo(edit.id, value);
  //     setEdit({
  //       id: null,
  //       value: "",
  //     });
  //   };

  //   if (edit.id) {
  //     return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  //   }

  return (
    <Table>
      <TableCaption>This crop's grow schedule!</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Day</TableHead>
          <TableHead>Task</TableHead>
          <TableHead>Info</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, i) => (
          <TableRow key={`${task.task}-${i}`}>
            <TableCell className="font-medium">{task.day}</TableCell>
            <TableCell>{task.task}</TableCell>
            <TableCell>{task.info}</TableCell>
            <TableCell className="text-right">
              <RiCloseCircleLine
                // onClick={() => deleteTask(task)}
                className="delete-icon"
              />
            </TableCell>
          </TableRow>
        ))}
        {/* <AddTaskForm onSubmit={handleUpdate} /> */}
      </TableBody>
    </Table>
  );
};
