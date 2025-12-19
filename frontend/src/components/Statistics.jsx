import React from "react";
import "../styles/dashboard.css";

/**
 * Statistics component
 * Hiển thị thống kê thời gian làm việc trong ngày
 */
export default function Statistics({
    totalTime = "3h 15m",
    tasksCompleted = 2,
    focusSessions = 4,
}) {
    return (
        <section className="statistics-card">
        <h2 className="statistics-title">📊 Daily Statistics</h2>

        <div className="statistics-grid">
        <div className="stat-item">
        <span className="stat-label">Total Time</span>
        <span className="stat-value">{totalTime}</span>
        </div>

        <div className="stat-item">
        <span className="stat-label">Tasks Completed</span>
        <span className="stat-value">{tasksCompleted}</span>
        </div>

        <div className="stat-item">
        <span className="stat-label">Focus Sessions</span>
        <span className="stat-value">{focusSessions}</span>
        </div>
        </div>
        </section>
    );
}
