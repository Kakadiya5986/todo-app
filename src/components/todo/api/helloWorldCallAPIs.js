import {apiClient} from "./ApiClient";

export const retrieveHelloWorldApi = () => apiClient.get('/hello-world-bean')
export const retrieveHelloWorldBeanApi = (username) => apiClient.get(`/hello-world/path-variable/${username}`)
export const executeBasicAuthenicationService = (token) => apiClient.get('/basicauth',{
    headers:{
        Authorization: token
    }
})
