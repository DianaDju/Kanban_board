import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { mockTasks } from "./mock-data/tasks";
import { ITask, TaskStatus } from "./types/Task";
import TaskDetail from "./components/TaskDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Board from "./components/Board";

function App() {
  // 1. Пытаемся загрузить данные из localStorage при первом запуске
  const [tasks, setTasks] = useState<ITask[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : mockTasks; // Если пусто — берем mockTasks
  });

  // 2. Следим за изменениями tasks и сохраняем их
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Функция для обновления описания
  const updateTaskDescription = (id: string, description: string) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, description } : t,
    );
    setTasks(updatedTasks);
  };

  const addTask = (title: string) => {
    const newTask: ITask = {
      id: Math.random().toString(36).substr(2, 9),
      title: title,
      description: "",
      status: "backlog",
    };
    setTasks([...tasks, newTask]);
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          {/* Главная страница с доской */}
          <Route
            path="/"
            element={
              <Board tasks={tasks} onAddTask={addTask} onMoveTask={moveTask} />
            }
          />

          {/* Детальная страница задачи */}
          <Route
            path="/tasks/:taskId"
            element={
              <TaskDetail tasks={tasks} onUpdate={updateTaskDescription} />
            }
          />
        </Routes>
      </main>
      <Footer tasks={tasks} />
    </div>
  );
}

export default App;
