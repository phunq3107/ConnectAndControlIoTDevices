import { useContext, useEffect, useState } from "react";
import { LogTable } from "../../components"
import styles from './AdminLog.module.css'
import { AuthContext } from "../../services/authorization/AuthContext";
import { getAllLogByAdmin } from "../../services/logAPI"
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import { useParams } from "react-router-dom";
import { handleActionData, handleDescription, formatTimeData } from '../../services/datahandler'
function EmLogAdmin() {
    var {username} = useParams()
    const auth = useContext(AuthContext)
    const [log, setLog] = useState([])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token && user.role === "ADMIN") {
            if (username !== "admin")
                getAllLogByAdmin(user, username).then(res => {
                    setLog(res)
                    console.log(log)
                })
        }
        else auth.logout()
    }, []);
    const handleLog = (log) => {
        const formattedLog = log.map(lg =>
        ({
            ...lg,
            action: handleActionData(lg.action),
            description: handleDescription(lg.description),
            timestamp: formatTimeData(lg.timestamp)
        }))
        return formattedLog.reverse()
    }
        return (
            <>
                <AdminNavbar />
                <div className={styles.container}>
                    <AdminSidebar />
                    <div className={styles.content}>
                        <h2 className={styles.title}>Nhật ký hoạt động của {username}</h2>
                        <LogTable headers={["ID", "User", "Hoạt động", "Mô tả", "Thời gian"]} data={handleLog(log)} />
                    </div>
                </div>
            </>
        )
}
export default EmLogAdmin