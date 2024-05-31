import './TodoApp.css';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import HeaderComponent from './HeaderComponent';
import LoginComponent from './LoginComponent';
import WelcomeComponent from './WelcomeComponent';
import TodoListComponent from './TodoListComponent';
import LogoutComponent from './Logout';
import FooterComponent from './FooterComponent';
import ErrorComponent from './ErrorComponent';
import AuthProvider, { useAuth } from './security/AuthContext';
import TodoComponent from './TodoComponent';

function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/"/>
}
export default function TodoApp(){
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                        <Routes>
                            <Route path='/' element={<LoginComponent/>}></Route>
                            <Route path='/login' element={<LoginComponent/>}></Route>

                            <Route path='/welcome/:username' element={
                                <AuthenticatedRoute>
                                   <WelcomeComponent/>
                                </AuthenticatedRoute>
                            }></Route>

                            <Route path='/todos' element={
                                <AuthenticatedRoute>
                                    <TodoListComponent/>
                                </AuthenticatedRoute>    
                            }></Route>

                            <Route path='/todo/:id' element={
                                <AuthenticatedRoute>
                                    <TodoComponent/>
                                </AuthenticatedRoute>    
                            }></Route>    

                            <Route path='/logout' element={
                                <AuthenticatedRoute>
                                    <LogoutComponent/>
                                </AuthenticatedRoute>    
                            }></Route>
                            <Route path='*' element={<ErrorComponent/>}></Route>
                        </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}










