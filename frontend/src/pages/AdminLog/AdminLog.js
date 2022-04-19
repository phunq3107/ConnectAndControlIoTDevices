import { useContext, useEffect, useState } from "react";
import { LogTable} from "../../components"
import styles from './AdminLog.module.css'
import { AuthContext } from "../../services/authorization/AuthContext";
import { getAllLogByAdmin} from "../../services/logAPI"
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import GetAllAccounts from "../../services/userAPI/GetAllAccounts";
function AdminLog() {
    const auth = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [log, setLog] = useState()
    const [logs, setLogs] = useState([])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token && user.role === 'ADMIN') {
            GetAllAccounts(user).then(users => setUsers(users))
            console.log(users)   
        } else {
            auth.logout()
        }
    }, [])
    useEffect(() => {
        if (users && users.length > 0) {
        const user = auth.getCurrentUser()
        if (user && user.access_token && user.role==="ADMIN") {
            users.forEach(u => {
                if(u.username!=="admin")
                    getAllLogByAdmin(user,u.username).then(res => {setLog(res)})
                    if (log !== undefined && log.length > 0) setLogs(logs => [...logs, ...log]);
            }) 
            
        }
        else auth.logout()
    }
    }, [users]);
    console.log(logs)
    if (logs) {
        return (
            <>
                <AdminNavbar />
                <div className={styles.container}>
                    <AdminSidebar />
                    <div className={styles.content}>
                        <h2 className={styles.title}>Nhật ký hoạt động</h2>
                        <LogTable headers={["ID", "User", "Hoạt động", "Mô tả", "Thời gian"]} 
                        data={logs.filter((e)=>e!==undefined).reduce((unique, o) => {
                            if(!unique.some(obj => obj.id === o.id))
                                unique.push(o)
                            return unique;
                        },[])} />
                        {/* <LogTable headers={["ID", "User", "Hoạt động", "Mô tả", "Thời gian"]} data={log} /> */}
                    </div>
                </div>
            </>
        )
    }
    else return null
}
export default AdminLog