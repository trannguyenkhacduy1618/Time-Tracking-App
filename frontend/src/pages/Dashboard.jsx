import React, { useState, useEffect } from "react";
import Stopwatch from "../components/Stopwatch";
import TaskCard from "../components/TaskCard";
import ReportTable from "../components/ReportTable";
import Statistics from "../components/Statistics";
import axios from "axios";
import "./Dashboard.css";

// Section wrapper với scroll nếu nội dung dài
const Section = ({ title, children }) => (
  <div className="dashboard-section">
  <h2 className="section-title">{title}</h2>
  <div className="section-content">{children}</div>
  </div>
);

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks/my/assigned");
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("/api/reports/daily");
        setReports(res.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="dashboard-container">
    <h1 className="dashboard-title">Dashboard</h1>
    <div className="dashboard-grid-advanced">
    {/* Column Left */}
    <div className="dashboard-column">
    <Section title="Stopwatch">
    <Stopwatch taskId={selectedTaskId} />
    </Section>

    <Section title="My Tasks">
    <div className="task-list">
    {tasks.map((task) => (
      <TaskCard
      key={task.id}
      task={task}
      onSelect={() => setSelectedTaskId(task.id)}
      />
    ))}
    </div>
    </Section>
    </div>

    {/* Column Right */}
    <div className="dashboard-column">
    <Section title="Daily Reports">
    <ReportTable reports={reports} />
    </Section>

    <Section title="Statistics">
    <Statistics reports={reports} />
    </Section>
    </div>
    </div>
    </div>
  );
};

export default Dashboard;
