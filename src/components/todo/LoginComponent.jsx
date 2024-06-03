import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

export default function LoginComponent(){
    const [username,setUsername] = useState("Pavan")
    const [password,setPassword] = useState(" ")
    const [loginstatus,setLoginStatus] = useState("NoAction")
    const navigate = useNavigate()
    const authContext = useAuth()


    async function checkstatus() {
        try{
            if(await authContext.login(username,password)){
               setLoginStatus("success")
                navigate(`/welcome/${username}`)
            }
        }catch(error){
            setLoginStatus("fail")
            console.log(error)
        }    
        
    }


    return(
        <div className="Login">
            {loginstatus==="success" && <div className='status'> Login Successful</div>}
            {loginstatus==="fail" && <div className='status'> Login Failed. Invalid Credentials.</div>}
            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={(event)=> setUsername(event.target.value)}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={(event)=> setPassword(event.target.value)}/>
                </div>
                <div>
                    <button type="button" className="LoginButton" onClick={checkstatus}> Login </button>
                </div>
            </div>
        </div>
    )
}