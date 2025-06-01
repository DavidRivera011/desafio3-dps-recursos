import axios from 'axios';
const API_URL = 'https://683b88cb28a0b0f2fdc4e047.mockapi.io/api/v1/recursos';

export const getRecursos = () => axios.get(API_URL);
export const getRecurso = (id) => axios.get(`${API_URL}/${id}`);
export const addRecurso = (data) => axios.post(API_URL, data);
export const updateRecurso = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteRecurso = (id) => axios.delete(`${API_URL}/${id}`);