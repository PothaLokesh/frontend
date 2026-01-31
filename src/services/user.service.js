import axios from "axios";

const API = "http://localhost:5000/api/users";

export const getUsers = (page = 1) =>
    axios.get(`${API}?page=${page}&limit=5`);

export const getUser = (id) => axios.get(`${API}/${id}`);

export const createUser = (data) => axios.post(API, data);

export const updateUser = (id, data) =>
    axios.put(`${API}/${id}`, data);

export const deleteUser = (id) =>
    axios.delete(`${API}/${id}`);

export const searchUsers = (query) =>
    axios.get(`${API}/search?query=${query}`);

export const exportCsv = () =>
    window.open(`${API}/export`, "_blank");
