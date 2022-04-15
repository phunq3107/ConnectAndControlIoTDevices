import { useContext, useEffect, useRef, useState } from "react";
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
    const [log, setLog] = useState([])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token && user.role === 'ADMIN') {
            GetAllAccounts(user).then(users => setUsers(users))
        } else {
            auth.logout()
        }
    }, [])
    useEffect(() => {
        if (users && users.length > 0) {
            const user = auth.getCurrentUser()
            if (user && user.access_token && user.role==="ADMIN") {
                let promiseLogs = users.map(u => { 
                    if(u.username!=="admin")  {
                        return getAllLogByAdmin(user, u.username).then(res=>res)
                    }
                },[])
                Promise.all(promiseLogs).then((arr) => {
                    setLog(arr.filter(a => a !== undefined && a.length > 0).flat().sort(
                        function(a,b) {
                            var d1 = new Date(a.timestamp)
                            var d2 = new Date(b.timestamp)
                            if (d1 < d2) {
                                return 1
                            } 
                            if (d1 > d2) {
                                return -1
                            }
                            return 0
                        }))
                }).catch(err => console.log(err))
            } else {
                auth.logout()
            }
        } 
    }, [users]);
    //console.log(users)
    
    console.log(log)
        return (
            <>
                <AdminNavbar />
                <div className={styles.container}>
                    <AdminSidebar />
                    <div className={styles.content}>
                        <h2 className={styles.title}>Nhật ký hoạt động</h2>
                        {/* <LogTable headers={["ID", "User", "Hoạt động", "Mô tả", "Thời gian"]} 
                        data={logs.reduce((unique, o) => {
                            if(!unique.some(obj => obj.id === o.id))
                                unique.push(o)
                            return unique;
                        },[]).sort(
                            function(a,b) {
                                var d1 = new Date(a.timestamp)
                                var d2 = new Date(b.timestamp)
                                if (d1 < d2) {
                                    return 1
                                } 
                                if (d1 > d2) {
                                    return -1
                                }
                                return 0
                            }
                        )} /> */}
                        <LogTable headers={["ID", "User", "Hoạt động", "Mô tả", "Thời gian"]} data={log} />
                    </div>
                </div>
            </>
        )
}
export default AdminLog