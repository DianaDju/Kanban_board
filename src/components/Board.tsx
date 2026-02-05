import React from "react";
import List from "./List";
import { ITask, TaskStatus } from "../types/Task";
import "../styles/Board.css";

interface BoardProps {
  tasks: ITask[];
  onAddTask: (title: string) => void;
  onMoveTask: (taskId: string, status: TaskStatus) => void;
}

const Board = ({ tasks, onAddTask, onMoveTask }: BoardProps) => {
  const backlogTasks = tasks.filter((t) => t.status === "backlog");
  const readyTasks = tasks.filter((t) => t.status === "ready");
  const inProgressTasks = tasks.filter((t) => t.status === "inProgress");
  const finishedTasks = tasks.filter((t) => t.status === "finished");

  return (
    <div className="board">
      <List
        title="Backlog"
        status="backlog"
        tasks={backlogTasks}
        onAddTask={onAddTask}
      />
      <List
        title="Ready"
        status="ready"
        tasks={readyTasks}
        previousTasks={backlogTasks} // Передаем задачи из бэклога
        onMoveTask={onMoveTask}
      />
      <List
        title="In Progress"
        status="inProgress"
        tasks={inProgressTasks}
        previousTasks={readyTasks} // Передаем задачи из Ready
        onMoveTask={onMoveTask}
      />
      <List
        title="Finished"
        status="finished"
        tasks={finishedTasks}
        previousTasks={inProgressTasks} // Передаем задачи из In Progress
        onMoveTask={onMoveTask}
      />
    </div>
  );
};

export default Board;
