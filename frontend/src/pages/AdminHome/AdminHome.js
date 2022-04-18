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
            <AdminNavbar/>
            {/* <div className={styles.incubator_list}>
                {incubators.map(incubator => <li><Link key={incubator.key} to="/incubator" state={{ incubatorKey: incubator.key }}>{incubator.name}</Link></li>)}
            </div> */}
            <div className={styles.placeholder}>
                <AdminSidebar/>
                <div className={styles.container}>
                    <div className={styles.topCards}>
                        <Link to={{pathname:"/admin/employees"}}>
                        <div className={styles.card}>
                            <img src="./paper.png" alt="Avatar" className={styles.image}/>
                            <div className={styles.cardcontainer}>
                                <h3><b>Quản lý nhân viên</b></h3> 
                            </div>
                        </div>
                        </Link>
                        <Link to={{pathname:"/admin/groups"}}>
                        <div className={styles.card}>
                            <img src="./bar-chart.png" alt="Avatar" className={styles.image}/>
                            <div className={styles.cardcontainer}>
                                <h3><b>Quản lý nhóm</b></h3> 
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className={styles.topCards}>
                        <Link to={{pathname:"/admin/info"}}>
                        <div className={styles.card}>
                            <img src="./user.png" alt="Avatar" className={styles.image}/>
                            <div className={styles.cardcontainer}>
                                <h3><b>Cá nhân</b></h3> 
                            </div>
                        </div>
                        </Link>
                        <Link to={{pathname:"/admin/groups"}}>
                        <div className={styles.card}>
                            <img src="./customer-support.png" alt="Avatar" className={styles.image}/>
                            <div className={styles.cardcontainer}>
                                <h3><b>Hoạt động</b></h3> 
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}
