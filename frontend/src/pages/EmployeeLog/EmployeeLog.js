import { useContext, useEffect, useState } from "react";
import { LogTable, Navbar, Sidebar } from "../../components"
import styles from './employeeLog.module.css'
import { AuthContext } from "../../services/authorization/AuthContext";
import { getLogByUsername } from "../../services/logAPI"
function EmployeeLog() {
    const auth = useContext(AuthContext)
    const [log, setLog] = useState()
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token) {
            getLogByUsername(user).then(res => {
                setLog(res)
            })
        }
        else auth.logout()
    }, []);
    if (log) {
        console.log(log)
        return (
            <>
                <Navbar />
                <div className={styles.container}>
                    <Sidebar />
                    <div className={styles.content}>
                        <h2 className={styles.title}>Nhật ký hoạt động</h2>
                        <LogTable headers={["ID", "User", "Hoạt động", "Mô tả", "Thời gian"]} data={log} />
                    </div>
                </div>
            </>
        )
    }
    else return null
}
export default EmployeeLog