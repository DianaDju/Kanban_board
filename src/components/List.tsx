import { Link } from "react-router-dom";
import React, { useState } from "react";
import { ITask, TaskStatus } from "../types/Task";
import "../styles/List.css";

interface ListProps {
  title: string;
  status: TaskStatus;
  tasks: ITask[];
  onAddTask?: (title: string) => void;
  onMoveTask?: (taskId: string, status: TaskStatus) => void;
  previousTasks?: ITask[]; // Задачи из предыдущей колонки
}

const List = (props: ListProps) => {
  const {
    title,
    status,
    tasks,
    onAddTask,
    onMoveTask,
    previousTasks = [],
  } = props;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Обработка выбора задачи из списка
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onMoveTask) {
      onMoveTask(e.target.value, status);
      setIsFormOpen(false);
    }
  };

  return (
    <div className="list">
      <h3 className="list-title">{title}</h3>
      <div className="list-cards">
        {tasks.map((task) => (
          <Link key={task.id} to={`/tasks/${task.id}`} className="card-link">
            <div className="card">{task.title}</div>
          </Link>
        ))}
      </div>

      {isFormOpen ? (
        status === "backlog" ? (
          /* Форма добавления для Backlog */
          <div className="add-card-form">
            <input
              className="input-task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <button
              className="submit-btn"
              onClick={() => {
                if (inputValue.trim() && onAddTask) {
                  onAddTask(inputValue);
                  setInputValue("");
                  setIsFormOpen(false);
                }
              }}
            >
              Submit
            </button>
          </div>
        ) : (
          /* Дропдаун для остальных колонок */
          <select
            className="select-task"
            onChange={handleSelectChange}
            onBlur={() => setIsFormOpen(false)}
            autoFocus
          >
            <option value="">Select a task...</option>
            {previousTasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
        )
      ) : (
        /* Кнопка + Add card */
        <button
          className="add-card-btn"
          disabled={status !== "backlog" && previousTasks.length === 0} // Делаем disabled если пусто
          onClick={() => setIsFormOpen(true)}
        >
          + Add card
        </button>
      )}
    </div>
  );
};

export default List;
