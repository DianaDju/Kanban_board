import React from "react";
import { ITask } from "../types/Task";
import "../styles/Footer.css";

interface FooterProps {
  tasks: ITask[];
}

const Footer = ({ tasks }: FooterProps) => {
  const activeTasksCount = tasks.filter((t) => t.status === "backlog").length;
  const finishedTasksCount = tasks.filter(
    (t) => t.status === "finished",
  ).length;

  return (
    <footer className="footer">
      <div className="footer-stats">
        <span className="footer-counter">Active tasks: {activeTasksCount}</span>
        <span className="footer-counter">
          Finished tasks: {finishedTasksCount}
        </span>
      </div>
      <div className="footer-copyright">
        Kanban board by {"DIANA"}, {"2025"}
      </div>
    </footer>
  );
};

export default Footer;
