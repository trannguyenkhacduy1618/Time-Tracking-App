import api from "./api";

/**
 * Helper: Lấy headers với token
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

/**
 * Lấy danh sách task theo board + filter
 */
const getTasks = async ({ boardId, status, priority, assignedTo }) => {
  try {
    const params = { board_id: boardId };
    if (status) params.status = status;
    if (priority) params.priority = priority;
    if (assignedTo) params.assigned_to = assignedTo;

    const response = await api.get("/tasks", {
      params,
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("getTasks error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Lấy task theo ID
 */
const getTaskById = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("getTaskById error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Tạo task mới
 */
const createTask = async (taskData) => {
  try {
    const response = await api.post("/tasks", taskData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("createTask error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Cập nhật task
 */
const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("updateTask error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Di chuyển task (Kanban / status / position)
 */
const moveTask = async (taskId, status, position = null) => {
  try {
    const response = await api.patch(
      `/tasks/${taskId}/move`,
      { status, position },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("moveTask error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Assign task cho user
 */
const assignTask = async (taskId, userId) => {
  try {
    const response = await api.patch(
      `/tasks/${taskId}/assign`,
      { assigned_to: userId },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("assignTask error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Xóa task
 */
const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("deleteTask error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Lấy task được assign cho user hiện tại
 */
const getMyAssignedTasks = async () => {
  try {
    const response = await api.get("/tasks/my/assigned", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("getMyAssignedTasks error:", error.response?.data || error.message);
    throw error;
  }
};

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  moveTask,
  assignTask,
  deleteTask,
  getMyAssignedTasks,
};
