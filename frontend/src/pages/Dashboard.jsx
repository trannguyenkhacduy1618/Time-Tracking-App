import React, { useState, useEffect } from "react";
import Stopwatch from "../components/Stopwatch";
import TaskCard from "../components/TaskCard";
import ReportTable from "../components/ReportTable";
import Statistics from "../components/Statistics";
import BoardCard from "../components/BoardCard";

import taskService from "../services/taskService";
import reportService from "../services/reportService";
import boardService from "../services/boardService";

import "../styles/dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [boards, setBoards] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [loading, setLoading] = useState({
    tasks: true,
    boards: true,
    reports: true,
  });

  // ---------------- Fetch data ----------------
  const fetchTasks = async () => {
    setLoading((prev) => ({ ...prev, tasks: true }));
    try {
      const data = await taskService.getMyAssignedTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading((prev) => ({ ...prev, tasks: false }));
    }
  };

  const fetchBoards = async () => {
    setLoading((prev) => ({ ...prev, boards: true }));
    try {
      const data = await boardService.getBoards();
      setBoards(data);
    } catch (err) {
      console.error("Error fetching boards:", err);
    } finally {
      setLoading((prev) => ({ ...prev, boards: false }));
    }
  };

  const fetchReports = async () => {
    setLoading((prev) => ({ ...prev, reports: true }));
    try {
      const data = await reportService.getDailyReport();
      setReports(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading((prev) => ({ ...prev, reports: false }));
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchBoards();
    fetchReports();
  }, []);

  // ---------------- CRUD Handlers ----------------
  const addTask = async (taskData) => {
    await taskService.createTask(taskData);
    fetchTasks();
  };

  const updateTask = async (taskId, data) => {
    await taskService.updateTask(taskId, data);
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await taskService.deleteTask(taskId);
    fetchTasks();
  };

  const addBoard = async (boardData) => {
    await boardService.createBoard(boardData);
    fetchBoards();
  };

  const updateBoard = async (boardId, data) => {
    await boardService.updateBoard(boardId, data);
    fetchBoards();
  };

  const deleteBoard = async (boardId) => {
    await boardService.deleteBoard(boardId);
    fetchBoards();
  };

  return (
    <div className="dashboard-container">
    <h1>Dashboard</h1>

    {/* Stopwatch */}
    <section className="stopwatch-section">
    <h2>Stopwatch</h2>
    <Stopwatch taskId={selectedTaskId} onStop={fetchTasks} />
    </section>

    {/* Boards */}
    <section className="boards-section">
    <h2>Boards</h2>
    {loading.boards ? (
      <p>Loading boards...</p>
    ) : boards.length === 0 ? (
      <p>No boards available</p>
    ) : (
      <div className="board-cards">
      {boards.map((board) => (
        <BoardCard
        key={board.id}
        board={board}
        onUpdate={(data) => updateBoard(board.id, data)}
        onDelete={() => deleteBoard(board.id)}
        />
      ))}
      </div>
    )}
    <button onClick={() => addBoard({ name: "New Board" })}>Add Board</button>
    </section>

    {/* Tasks */}
    <section className="tasks-section">
    <h2>My Tasks</h2>
    {loading.tasks ? (
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
        onUpdate={(data) => updateTask(task.id, data)}
        onDelete={() => deleteTask(task.id)}
        />
      ))}
      </div>
    )}
    <button onClick={() => addTask({ title: "New Task" })}>Add Task</button>
    </section>

    {/* Daily Reports */}
    <section className="reports-section">
    <h2>Daily Reports</h2>
    {loading.reports ? (
      <p>Loading reports...</p>
    ) : reports.length === 0 ? (
      <p>No reports found</p>
    ) : (
      <ReportTable data={reports} />
    )}
    </section>

    {/* Statistics */}
    <section className="statistics-section">
    <h2>Statistics</h2>
    <Statistics reports={reports} />
    </section>
    </div>
  );
};

export default Dashboard;
