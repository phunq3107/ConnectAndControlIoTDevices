import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../services/authorization/AuthContext'
import styles from './AdminHome.module.css'
import { Link } from 'react-router-dom'
import AdminSidebar from '../../components/Sidebar/AdminSidebar'
import AdminNavbar from '../../components/Navbar/AdminNavbar'
import GetAllGroups from '../../services/groupsAPI/GetAllGroups'
export default function AdminHome() {
    const auth = useContext(AuthContext)
    const [incubators, setIncubators] = useState([])
    const user = auth.getCurrentUser()
    useEffect(() => {
        if (user && user.access_token && user.role == 'ADMIN') {
            GetAllGroups(user).then(groups => setIncubators(groups))
        } else {
            auth.logout()
        }
    }, [])
    return (
        <div>
            <AdminNavbar home/>
            {/* <div className={styles.incubator_list}>
                {incubators.map(incubator => <li><Link key={incubator.key} to="/incubator" state={{ incubatorKey: incubator.key }}>{incubator.name}</Link></li>)}
            </div> */}
            <div className={styles.placeholder}>
                <AdminSidebar/>
                <img src="/logo512.png" style={{flex:4,width:'100%'}}/>
            </div>
            
        </div>
    )
}
