import React, { useEffect, useState } from "react";

import Stopwatch from "../components/Stopwatch";
import TaskCard from "../components/TaskCard";
import BoardCard from "../components/BoardCard";
import ReportTable from "../components/ReportTable";
import Statistics from "../components/Statistics";
import BoardModal from "../components/BoardModal";

import taskService from "../services/taskService";
import boardService from "../services/boardService";
import reportService from "../services/reportService";

import "../styles/dashboard.css";

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);

  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [loading, setLoading] = useState({
    boards: true,
    tasks: true,
    reports: true,
  });

  const [showBoardModal, setShowBoardModal] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);

  // ---------------- Fetch ----------------
  const fetchBoards = async () => {
    setLoading((p) => ({ ...p, boards: true }));
    try {
      const data = await boardService.getBoards();
      setBoards(data);
    } catch {
      setBoards([]);
    } finally {
      setLoading((p) => ({ ...p, boards: false }));
    }
  };

  const fetchTasks = async () => {
    setLoading((p) => ({ ...p, tasks: true }));
    try {
      const data = await taskService.getMyAssignedTasks();
      setTasks(data);
    } catch {
      setTasks([]);
    } finally {
      setLoading((p) => ({ ...p, tasks: false }));
    }
  };

  const fetchReports = async () => {
    setLoading((p) => ({ ...p, reports: true }));
    try {
      const data = await reportService.getDailyReport();
      setReports(data);
    } catch {
      setReports([]);
    } finally {
      setLoading((p) => ({ ...p, reports: false }));
    }
  };

  useEffect(() => {
    fetchBoards();
    fetchTasks();
    fetchReports();
  }, []);

  // ---------------- Board handlers ----------------
  const handleCreateBoard = async (data) => {
    await boardService.createBoard(data);
    setShowBoardModal(false);
    fetchBoards();
  };

  const handleUpdateBoard = async (id, data) => {
    await boardService.updateBoard(id, data);
    setShowBoardModal(false);
    setEditingBoard(null);
    fetchBoards();
  };

  const handleDeleteBoard = async (id) => {
    if (!window.confirm("Delete this board?")) return;
    await boardService.deleteBoard(id);
    fetchBoards();
  };

  return (
    <div className="dashboard-container">
    <h1>Dashboard</h1>

    {/* Stopwatch */}
    <section>
    <h2>Stopwatch</h2>
    <Stopwatch taskId={selectedTaskId} onStop={fetchTasks} />
    </section>

    {/* Boards */}
    <section>
    <div className="section-header">
    <h2>Boards</h2>
    <button
    onClick={() => {
      setEditingBoard(null);
      setShowBoardModal(true);
    }}
    >
    + Add Board
    </button>
    </div>

    {loading.boards ? (
      <p>Loading boards...</p>
    ) : boards.length === 0 ? (
      <p>No boards</p>
    ) : (
      <div className="board-cards">
      {boards.map((board) => (
        <BoardCard
        key={board.id}
        board={board}
        onUpdate={() => {
          setEditingBoard(board);
          setShowBoardModal(true);
        }}
        onDelete={() => handleDeleteBoard(board.id)}
        />
      ))}
      </div>
    )}
    </section>

    {/* Tasks */}
    <section>
    <h2>My Tasks</h2>
    {loading.tasks ? (
      <p>Loading tasks...</p>
    ) : tasks.length === 0 ? (
      <p>No tasks assigned</p>
    ) : (
      <div className="task-cards">
      {tasks.map((task) => (
        <TaskCard
        key={task.id}
        task={task}
        onSelect={() => setSelectedTaskId(task.id)}
        />
      ))}
      </div>
    )}
    </section>

    {/* Reports */}
    <section>
    <h2>Daily Reports</h2>
    {loading.reports ? (
      <p>Loading reports...</p>
    ) : (
      <ReportTable data={reports} />
    )}
    </section>

    {/* Statistics */}
    <section>
    <h2>Statistics</h2>
    <Statistics reports={reports} />
    </section>

    {/* Board Modal */}
    <BoardModal
    open={showBoardModal}
    initialData={editingBoard}
    onClose={() => {
      setShowBoardModal(false);
      setEditingBoard(null);
    }}
    onSubmit={(data) =>
      editingBoard
      ? handleUpdateBoard(editingBoard.id, data)
      : handleCreateBoard(data)
    }
    />
    </div>
  );
};

export default Dashboard;
