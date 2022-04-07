import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../services/authorization/AuthContext"
import AdminNavbar from "../../components/Navbar/AdminNavbar"
import AdminSidebar from "../../components/Sidebar/AdminSidebar"
import styles from './EmployeeManage.module.css'

export default function EmployeeCreateForm () {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (!(user && user.access_token)) {
            auth.logout()
        }
    }, [])
    const handleSubmit = () => {
        const user = auth.getCurrentUser()
        if (user && user.access_token && user.role == 'ADMIN') {
        const newuser = {
                "password": password,
                "username": username
            }
            var myHeaders = new Headers()
            myHeaders.append("Authorization", `Bearer ${user.access_token}`)
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(newuser),
                redirect: 'follow'
            }
            fetch("http://localhost:8080/api/v1/accounts", requestOptions)
                    .then(response => {
                        if (response.status === 200) {
                            return response.text()
                        }
                        throw new Error(response.status)
                    })
                    .then(result => {
                        navigate(-1)
                    })
                    .catch(error => console.log('error', error))
        } else {
            auth.logout()
        }
    }
    return (
        <>
        <AdminNavbar></AdminNavbar>
        <div className={styles.container}>
            <AdminSidebar></AdminSidebar>
            <div className={styles.form}>
                <div>Sign In Form</div>
                <form>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={(e)=>setUsername(e.target.value)}/><br></br><br></br>
                    <label htmlFor="pass">Password:</label>
                    <input type="text" id="pass" name="pass" onChange={(e)=>setPassword(e.target.value)}/><br></br><br></br>
                    <button  onClick={handleSubmit}>CREATE</button>
                </form>
            </div>
        </div>
        
        </>
    )
}