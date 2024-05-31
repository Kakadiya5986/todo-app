import axios from "axios"

const apiClient = axios.create(
    {
        baseURL:'http://localhost:8080'
    }
)

export const retrieveHelloWorldApi = () => apiClient.get('/hello-world-bean')
export const retrieveHelloWorldBeanApi = (username) => apiClient.get(`/hello-world/path-variable/${username}`)