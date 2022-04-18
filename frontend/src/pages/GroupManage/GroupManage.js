import { useContext, useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import { AuthContext } from "../../services/authorization/AuthContext";
import { getAllGroups } from "../../services/groupsAPI";
import styles from './GroupManage.module.css'
export default function GroupManage () {
    const auth = useContext(AuthContext)
    const [groups, setGroups] = useState([])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token) {
            getAllGroups(user).then(res => setGroups(res))
        }
        else auth.logout()
    }, [])
    return (
        <>
        <AdminNavbar/>
        <div className={styles.container}>
            <AdminSidebar></AdminSidebar>
            <div className={styles.content}>
                {
                    groups.map((g) => {
                        return (
                        <Link key={g.key} to={{pathname:`/admin/groups/${g.key}`}}>
                            <div className={styles.entry}>
                                <span>Nhóm {g.name}</span>
                                <FaAngleRight className={styles.infoIcon}></FaAngleRight>
                            </div>
                        </Link>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}