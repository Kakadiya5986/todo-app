import {apiClient} from "./ApiClient";

export const retrieveTodosApi = (username) => apiClient.get(`/users/${username}/todos`)
export const deleteTodoApi = (id,username) => apiClient.delete(`/users/${username}/todos/${id}`)
export const retriveTodoApi = (id,username) => apiClient.get(`/users/${username}/todos/${id}`)
export const updateTodoApi = (id,username,todo) => apiClient.put(`/users/${username}/todos/${id}`,todo)
export const addTodoApi = (username,todo) => apiClient.post(`/users/${username}/todos`,todo)