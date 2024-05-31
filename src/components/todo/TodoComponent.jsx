import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import { retriveTodoApi, updateTodoApi, addTodoApi } from "./api/todoAPICall"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"

export default function TodoComponent(){
    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username
    const [description,setDescription] = useState('')
    const [targetDate,setTargetDate] = useState('')
    const navigate = useNavigate()

    useEffect(
        ()=> {
                if(id!=-1){
                    retriveTodoApi(id,username)
                    .then(
                         response => {
                            setDescription(response.data.description)
                            setTargetDate(response.data.targetDate)
                        }        
                    )
                    .catch(
                        error=>console.log(error)
                    )
                }      
        },[id]
    )

    function onSubmit(values){
        console.log(values)
        console.log(typeof(id))
        const todo = {
            id: id,
            username : username,
            description : values.description,
            targetDate : values.targetDate,
            done : false
        }

        if(id==-1){
            todo.id = 0
            addTodoApi(username,todo)
            .then(
                 navigate('/todos')          
            )
            .catch(
                error=>console.log(error)
            )
        } else {
            updateTodoApi(id,username,todo)
            .then(
                 navigate('/todos')          
            )
            .catch(
                error=>console.log(error)
            )
        }
    }

    function validate(values){
        let errors={}
        if(values.description.length<5){
            errors.description = "Enter atleast 5 charecters"
        }

        if(values.targetDate === '' || values.targetDate === null){
            errors.targetDate = "Enter the Target Date"
        }
        console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1> Todo Details </h1>
            <div>
                <Formik initialValues={{description,targetDate}}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                {
                    (props)=>(
                        <Form>
                            <ErrorMessage name="description" className="alert alert-warning" component="div"/>
                            <ErrorMessage name="targetDate" className="alert alert-warning" component="div"/>

                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit"> Save </button>
                            </div>
                        </Form>     
                    )
                }    
                </Formik>
            </div>

        </div>
    )
}