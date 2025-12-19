import api from "./api";

/**
 * Helper: Lấy headers với token
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

/**
 * ============================
 * ⏱️ TIME TRACKING / STOPWATCH
 * ============================
 */

/**
 * Bắt đầu đo thời gian cho task
 */
const startTimer = async (taskId) => {
  try {
    const response = await api.post(
      "/time/start",
      { task_id: taskId },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("startTimer error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Dừng đo thời gian (stopwatch)
 */
const stopTimer = async (entryId) => {
  try {
    const response = await api.post(
      "/time/stop",
      { entry_id: entryId },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("stopTimer error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Lấy time entry đang chạy (nếu có)
 */
const getRunningEntry = async () => {
  try {
    const response = await api.get("/time/running", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("getRunningEntry error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Lấy time entries của task
 */
const getTaskTimeEntries = async (taskId) => {
  try {
    const response = await api.get(`/time/task/${taskId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("getTaskTimeEntries error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ============================
 * 📅 DAILY REPORT
 * ============================
 */

/**
 * Báo cáo thời gian theo ngày
 */
const getDailyReport = async (date) => {
  try {
    const response = await api.get("/reports/daily", {
      params: { date },
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("getDailyReport error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ============================
 * 📊 STATISTICS
 * ============================
 */

/**
 * Thống kê theo khoảng thời gian
 */
const getStatistics = async (startDate, endDate) => {
  try {
    const response = await api.get("/reports/statistics", {
      params: { start_date: startDate, end_date: endDate },
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("getStatistics error:", error.response?.data || error.message);
    throw error;
  }
};

export default {
  startTimer,
  stopTimer,
  getRunningEntry,
  getTaskTimeEntries,
  getDailyReport,
  getStatistics,
};
