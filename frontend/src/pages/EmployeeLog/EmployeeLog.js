import { useContext, useEffect, useState } from "react";
import { LogTable, Navbar, SearchBar, Sidebar } from "../../components"
import styles from './employeeLog.module.css'
import { AuthContext } from "../../services/authorization/AuthContext";
import { getLogByUsername } from "../../services/logAPI"
import { handleActionData, handleDescription, formatTimeData } from '../../services/datahandler'
function EmployeeLog() {
    const auth = useContext(AuthContext)
    const [log, setLog] = useState()
    const [searchTerm, setSearchTerm] = useState("")
    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm)
    }
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token) {
            getLogByUsername(user).then(res => {
                setLog(res)
            })
        }
        else auth.logout()
    }, [])
    const handleLog = (log) => {
        const formattedLog = log.map(lg =>
        ({
            ...lg,
            action: handleActionData(lg.action),
            description: handleDescription(lg.description),
            timestamp: formatTimeData(lg.timestamp)
        }))
        if (searchTerm !== "") {
            return formattedLog.filter(lg => 
                lg.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lg.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        return formattedLog.reverse()
    }
    if (log) {
        return (
            <>
                <Navbar />
                <div className={styles.container}>
                    <Sidebar />
                    <div className={styles.content}>
                        <h2 className={styles.title}>Nhật ký hoạt động</h2>
                        <SearchBar
                            term={searchTerm}
                            searchKeyWord={searchHandler}
                        />
                        <LogTable headers={["ID", "User", "Hoạt động", "Mô tả", "Thời gian"]} data={handleLog(log)} />
                    </div>
                </div>
            </>
        )
    }
    else return null
}
export default EmployeeLog