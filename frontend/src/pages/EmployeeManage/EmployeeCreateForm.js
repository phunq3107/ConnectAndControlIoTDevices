import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../services/authorization/AuthContext"
import AdminNavbar from "../../components/Navbar/AdminNavbar"
import AdminSidebar from "../../components/Sidebar/AdminSidebar"
import styles from './EmployeeManage.module.css'
import GetAllGroups from "../../services/groupsAPI/GetAllGroups"
import CreateNewUser from "../../services/userAPI/CreateNewUser"
import GrantPermission from "../../services/userAPI/GrantPermission"
import { FaArrowRight } from "react-icons/fa"


export default function EmployeeCreateForm () {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [groups, setGroups] = useState([])
    const [group, setGroup] = useState('')
        
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token && user.role == 'ADMIN') {
            GetAllGroups(user).then(groups => setGroups(groups))
        } else {
            auth.logout()
        }
    }, [])

    useEffect(() => {
        if (document.getElementById("username").value.length > 0 && document.getElementById("pass").value.length > 0) {
            document.getElementById("submit").classList.add(styles.active)
        }
        else {
            document.getElementById("submit").classList.remove(styles.active)
        }
    },[username, password])

    const handleSubmit = () => {
        const user = auth.getCurrentUser()
        if (user && user.access_token && user.role == 'ADMIN') {
                const newuser = {
                "password": password,
                "username": username
                }
                Promise.all([CreateNewUser(user,newuser), GrantPermission(user, username, group)])
                    .then(response => {
                        if (response.status === 200) {
                            return response.text()
                        }
                        throw new Error(response.status)
                    })
                    .then(result => {
                        navigate(-2)
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
                
                <form>
                    <div><h1>Registration Form</h1></div>
                    <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={(e)=>setUsername(e.target.value)}/><br></br><br></br>
                    </div>
                    <div>
                    <label htmlFor="pass">Password:</label>
                    <input type="password" id="pass" name="pass" onChange={(e)=>setPassword(e.target.value)}/><br></br><br></br>
                    </div>
                    <div>
                    <label htmlFor="group">Group:</label>
                    <select id={styles.group} name="group" onChange={(e)=>setGroup(e.target.value)}>
                        <option value="" selected="selected" className={styles.data_default}>---Assign a group---</option>
                        {groups.map((g) => <option value={g.key}>{g.key}</option>)}
                    </select>
                    </div>
                    <div className={styles.button} id="submit">
                        <button  onClick={handleSubmit}><FaArrowRight></FaArrowRight></button>
                    </div>
                </form>
            </div>
        </div>
        
        </>
    )
}