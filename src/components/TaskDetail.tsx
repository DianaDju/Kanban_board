import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ITask } from "../types/Task";
import "../styles/TaskDetail.css";

interface TaskDetailProps {
  tasks: ITask[];
  onUpdate: (id: string, desc: string) => void;
}

const TaskDetail = ({ tasks, onUpdate }: TaskDetailProps) => {
  const { taskId } = useParams<{ taskId: string }>(); // Берем ID из URL
  const task = tasks.find((t) => t.id === taskId);

  const [description, setDescription] = useState(task?.description || "");

  if (!task) return <div className="detail-container">Task not found!</div>;

  const handleBlur = () => {
    onUpdate(task.id, description);
  };

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h2>{task.title}</h2>
        {/* Кнопка крестик для возврата на главную */}
        <Link to="/" className="close-btn">
          &times;
        </Link>
      </div>

      <textarea
        className="detail-description"
        value={description}
        placeholder="This task has no description" // Текст-заглушка
        onChange={(e) => setDescription(e.target.value)}
        onBlur={handleBlur} // Сохраняем при выходе из поля
      />
    </div>
  );
};

export default TaskDetail;
