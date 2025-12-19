import React, { useState, useEffect } from "react";
import Stopwatch from "../components/Stopwatch";
import TaskCard from "../components/TaskCard";
import ReportTable from "../components/ReportTable";
import Statistics from "../components/Statistics";
import BoardCard from "../components/BoardCard";

import { getMyTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import { getDailyReport } from "../services/reportService";
import { getBoards, createBoard, updateBoard, deleteBoard } from "../services/boardService";

import "../styles/dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);
  const [boards, setBoards] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingBoards, setLoadingBoards] = useState(true);

  // ---------------- Fetch data ----------------
  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const res = await getMyTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoadingTasks(false);
    }
  };

  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      const res = await getDailyReport();
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoadingReports(false);
    }
  };

  const fetchBoards = async () => {
    setLoadingBoards(true);
    try {
      const res = await getBoards();
      setBoards(res.data);
    } catch (err) {
      console.error("Error fetching boards:", err);
    } finally {
      setLoadingBoards(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchReports();
    fetchBoards();
  }, []);

  // ---------------- CRUD handlers ----------------
  const handleAddTask = async (taskData) => {
    await createTask(taskData);
    fetchTasks();
  };

  const handleUpdateTask = async (taskId, data) => {
    await updateTask(taskId, data);
    fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    fetchTasks();
  };

  const handleAddBoard = async (boardData) => {
    await createBoard(boardData);
    fetchBoards();
  };

  const handleUpdateBoard = async (boardId, data) => {
    await updateBoard(boardId, data);
    fetchBoards();
  };

  const handleDeleteBoard = async (boardId) => {
    await deleteBoard(boardId);
    fetchBoards();
  };

  return (
    <div className="dashboard-container">
    <h1>Dashboard</h1>

    <section className="stopwatch-section">
    <h2>Stopwatch</h2>
    <Stopwatch taskId={selectedTaskId} />
    </section>

    <section className="boards-section">
    <h2>Boards</h2>
    {loadingBoards ? (
      <p>Loading boards...</p>
    ) : boards.length === 0 ? (
      <p>No boards available</p>
    ) : (
      <div className="board-cards">
      {boards.map((board) => (
        <BoardCard
        key={board.id}
        board={board}
        onUpdate={(data) => handleUpdateBoard(board.id, data)}
        onDelete={() => handleDeleteBoard(board.id)}
        />
      ))}
      </div>
    )}
    <button onClick={() => handleAddBoard({ name: "New Board" })}>Add Board</button>
    </section>

    <section className="tasks-section">
    <h2>My Tasks</h2>
    {loadingTasks ? (
      <p>Loading tasks...</p>
    ) : tasks.length === 0 ? (
      <p>No tasks assigned to you</p>
    ) : (
      <div className="task-cards">
      {tasks.map((task) => (
        <TaskCard
        key={task.id}
        task={task}
        onSelect={() => setSelectedTaskId(task.id)}
        onUpdate={(data) => handleUpdateTask(task.id, data)}
        onDelete={() => handleDeleteTask(task.id)}
        />
      ))}
      </div>
    )}
    <button onClick={() => handleAddTask({ title: "New Task" })}>Add Task</button>
    </section>

    <section className="reports-section">
    <h2>Daily Reports</h2>
    {loadingReports ? (
      <p>Loading reports...</p>
    ) : reports.length === 0 ? (
      <p>No reports found</p>
    ) : (
      <ReportTable reports={reports} />
    )}
    </section>

    <section className="statistics-section">
    <h2>Statistics</h2>
    <Statistics reports={reports} />
    </section>
    </div>
  );
};

export default Dashboard;
