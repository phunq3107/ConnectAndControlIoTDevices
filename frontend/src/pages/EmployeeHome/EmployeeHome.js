import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../services/authorization/AuthContext'
import styles from './employeeHome.module.css'
import { getAllGroups } from '../../services/groupsAPI'
import { Navbar, Sidebar, IncubatorCell } from '../../components'
function EmployeeHome() {
    const auth = useContext(AuthContext)
    const [incubators, setIncubators] = useState([])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token) {
            getAllGroups(user).then(res => setIncubators(res))
        }
        else auth.logout()
    }, [])
    if (incubators)
        return (
            <>
                <Navbar />
                <div className={styles.container}>
                    <Sidebar />
                    <div className={styles.content}>
                        <div className={styles.incubatorsContainer}>
                            {
                                incubators.map(incubator =>
                                    <IncubatorCell key = {incubator.key} incubator={incubator} />
                                )
                            }                                                 
                        </div>
                    </div>
                </div>
            </>
        )
    else return null
}
export default EmployeeHome