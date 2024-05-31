
import { useState } from "react"
import { useParams,Link } from "react-router-dom"
import { retrieveHelloWorldBeanApi } from "./api/helloWorldCallAPIs"


export default function WelcomeComponent(){
    const {username} = useParams()
    const [message, setMessage] = useState(null)

    function callHelloWorldRESTApi(){
        console.log("HelloWorld has been called")
        retrieveHelloWorldBeanApi('Dishank')
        .then((response)=>successfulResponse(response))
        .catch((error)=>errorResponse(error))
        .finally(console.log('axios has been executed'))
    }
    function successfulResponse(response){
        console.log(response)
        setMessage(response.data.message)
        console.log(message)
    }
    function errorResponse(error){
        console.log(error)
    }
    return(
        <div className='WelcomeComponent'> 
            <h1>Welcome to todo Mr.{username}</h1>
            <div>
                {/* <a href={`/todos/${username}`}>Go to your todos</a> */}
                <Link to={`/todos`}>Go to your todos</Link> 
            </div>
            <div>
                <button className='btn btn-success m-5' onClick={callHelloWorldRESTApi}> Go to HelloWorld  </button> 
            </div>
        </div>
    )
}