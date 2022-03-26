import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../AuthContext'
import styles from './AdminHome.module.css'
import { Link } from 'react-router-dom'
import Navbar from '../../../components/Navbar/Navbar'
import AdminSidebar from '../../../components/Sidebar/AdminSidebar'
import AdminNavbar from '../../../components/Navbar/AdminNavbar'
export default function AdminHome() {
    const auth = useContext(AuthContext)
    const [incubators, setIncubators] = useState([])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token && user.role == 'ADMIN') {
            
            var myHeaders = new Headers()
            myHeaders.append("Authorization", `Bearer ${user.access_token}`)
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }

            return fetch("http://localhost:8080/api/v1/groups", requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    throw new Error(response.status)
                })
                .then(result => {
                    setIncubators(result)
                    auth.setIncubators(result)
                })
                .catch(error => console.log('error', error))
        } else {
            auth.logout()
        }
    }, [])
    return (
        <div>
            <AdminNavbar home/>
            <div className={styles.incubator_list}>
                {incubators.map(incubator => <li><Link key={incubator.key} to="/incubator" state={{ incubatorKey: incubator.key }}>{incubator.name}</Link></li>)}
            </div>
            <div className={styles.placeholder}>
                <AdminSidebar/>
                <img src="/logo512.png" style={{flex:4,width:'100%'}}/>
            </div>
            
        </div>
    )
}
