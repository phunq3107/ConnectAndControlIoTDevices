import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../services/authorization/AuthContext'
import styles from './employeeHome.module.css'
import { Link } from 'react-router-dom'
import { getAllGroups } from '../../services/groupsAPI'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
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
                        {
                            incubators.map(incubator =>
                                <Link
                                    key={incubator.key}
                                    to="/incubator"
                                    state={{ incubatorKey: incubator.key }}
                                >
                                    {incubator.name}
                                </Link>
                            )
                        }
                    </div>
                </div>
            </>
        )
    else return null
}
export default EmployeeHome