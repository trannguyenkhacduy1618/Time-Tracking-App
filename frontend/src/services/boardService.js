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
 * 📋 BOARD MANAGEMENT
 * ============================
 */

/**
 * Lấy danh sách board của user
 */
const getBoards = async () => {
    try {
        const response = await api.get("/boards", { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("getBoards error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Lấy danh sách board public
 */
const getPublicBoards = async () => {
    try {
        const response = await api.get("/boards/public", { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("getPublicBoards error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Lấy board theo ID
 */
const getBoardById = async (boardId) => {
    try {
        const response = await api.get(`/boards/${boardId}`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("getBoardById error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Tạo board mới
 */
const createBoard = async (boardData) => {
    try {
        const response = await api.post("/boards", boardData, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("createBoard error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Cập nhật board
 */
const updateBoard = async (boardId, boardData) => {
    try {
        const response = await api.put(`/boards/${boardId}`, boardData, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("updateBoard error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Xóa board
 */
const deleteBoard = async (boardId) => {
    try {
        const response = await api.delete(`/boards/${boardId}`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("deleteBoard error:", error.response?.data || error.message);
        throw error;
    }
};

export default {
    getBoards,
    getPublicBoards,
    getBoardById,
    createBoard,
    updateBoard,
    deleteBoard,
};
