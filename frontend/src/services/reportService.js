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
 * 📅 DAILY / WEEKLY / BY-TASK REPORTS
 * ============================
 */

/**
 * Báo cáo hàng ngày
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
 * Báo cáo hàng tuần
 */
const getWeeklyReport = async (startDate, endDate) => {
    try {
        const response = await api.get("/reports/weekly", {
            params: { start_date: startDate, end_date: endDate },
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("getWeeklyReport error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Báo cáo theo task
 */
const getReportByTask = async (taskId) => {
    try {
        const response = await api.get("/reports/by-task", {
            params: { task_id: taskId },
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("getReportByTask error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Tổng hợp thống kê
 */
const getSummaryStatistics = async () => {
    try {
        const response = await api.get("/reports/summary", {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("getSummaryStatistics error:", error.response?.data || error.message);
        throw error;
    }
};

export default {
    getDailyReport,
    getWeeklyReport,
    getReportByTask,
    getSummaryStatistics,
};
