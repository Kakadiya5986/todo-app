import { createContext, useContext, useState } from "react";
import { executeBasicAuthenicationService } from "../api/helloWorldCallAPIs";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext()
export const useAuth = ()=>useContext(AuthContext)

export default function AuthProvider({children}){

    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [username,setUsername] = useState(null)
    const [token,setToken] = useState(null)


    async function login(username,password){

        const basicToken = 'Basic ' + window.btoa(username + ":"+ password)

        const response = await executeBasicAuthenicationService(basicToken)

        try{
            if(response.status==200){
                setIsAuthenticated(true)
                setUsername(username)
                setToken(basicToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = basicToken
                        return config
                    }
                )
                return true
            }else{
                logout()
            }
        }catch(error){
            logout()
        }   
    }

    function logout(){
        setIsAuthenticated(false)
            setUsername(null)
            setToken(null)
            return false
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,username,token}}>
            {children}
        </AuthContext.Provider>
    )
}