import { useEffect, useState } from "react" 
import { deleteTodoApi, retrieveTodosApi } from "./api/todoAPICall"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

export default function TodoListComponent(){
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()
 
    const [todos,setTodos] = useState([])

    useEffect(
        ()=>refreshTodos(),[]
    )

    function refreshTodos(){
        retrieveTodosApi('Pavan')
        .then(response=> {
            setTodos(response.data)
            }
        )
        .catch(error=>console.log(error))
    }

    function callDelete(id) {
        deleteTodoApi(id,username)
        .then(
            ()=>refreshTodos(),[]
        )
        console.log("clicked" + id)
    }

    function callUpdate(id) {
            navigate(`/todo/${id}`)
    }
    
    function addNewTodo() {
        navigate(`/todo/-1`)
}

    return(
        <div className='TodoList'>
            <h1>Your To-dos Mr.{username}</h1>
            <div className='Todotable'>
                <table className='table'>
                    <thead className='tablehead'>
                        <tr>
                            <th> DESCRIPTION </th>
                            <th> DONE </th>
                            <th> TARGETDATE </th>
                            <th> DELETE </th>
                            <th> UPDATE </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td> {todo.description}</td>
                                        <td> {todo.done.toString()} </td>
                                        <td> {todo.targetDate.toString()} </td>
                                        <td> <button className="btn btn-warning" onClick={()=>callDelete(todo.id)}>Delete</button></td>
                                        <td> <button className="btn btn-success" onClick={()=>callUpdate(todo.id)}>Update</button></td>
                                    </tr>
                                )       
                            )
                        }
                    </tbody>
                </table>
             </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}> Add New Todo</div>
        </div>
    )
}