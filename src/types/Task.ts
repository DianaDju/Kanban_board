// Описываем статусы задачи
export type TaskStatus = "backlog" | "ready" | "inProgress" | "finished";

// Описываем саму задачу
export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
