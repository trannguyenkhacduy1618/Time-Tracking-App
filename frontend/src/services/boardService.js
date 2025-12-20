import api from "./api";

// BOARDS
export const getBoards = async () => {
    const response = await api.get("/boards/");
    return response.data;
};

export const createBoard = async (data) => {
    const response = await api.post("/boards/", data);
    return response.data;
};

export const updateBoard = async (boardId, data) => {
    const response = await api.put(`/boards/${boardId}`, data);
    return response.data;
};

export const deleteBoard = async (boardId) => {
    const response = await api.delete(`/boards/${boardId}`);
    return response.data;
};
