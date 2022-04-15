import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../services/authorization/AuthContext"
import AdminNavbar from "../../components/Navbar/AdminNavbar"
import AdminSidebar from "../../components/Sidebar/AdminSidebar"
import styles from './EmployeeManage.module.css'
import GetAllAccounts from "../../services/userAPI/GetAllAccounts"
import { FaRegUser } from 'react-icons/fa'
import { GiEggClutch } from 'react-icons/gi'
import { getAllGroups } from "../../services/groupsAPI"
import GrantPermission from "../../services/userAPI/GrantPermission"
import RemoveFromGroup from "../../services/userAPI/RemoveFromGroup"
import ResetPassword from "../../services/userAPI/ResetPassword"
import { Link, useNavigate } from "react-router-dom"
export default function EmployeeManage() {
    const auth = useContext(AuthContext)
    const [employees,setEmployees] = useState([])
    //const [filteredEms, setFilteredEms] = useState([]);
    //const [searchInput, setSearchInput] = useState('');
    const [groups, setGroups] = useState([])
    const [group, setGroup] = useState('')
    const [username, setUsername] = useState('')
    const [toRemove, setToRemove] = useState('')
    const [toReset, setToReset] = useState('')
    
    const navigate = useNavigate()
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token && user.role == 'ADMIN') {
            GetAllAccounts(user).then(employees => setEmployees(employees))
        } else {
            auth.logout()
        }
    }, [])


    // useEffect(() => {
    //         if (searchInput) {
    //             const filteredData = employees.filter((item) => {
    //                 return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
    //             })
    //             setFilteredEms(filteredData)
    //         } else {
    //             setFilteredEms(employees)
    //         }
    // }, [searchInput, filteredEms])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token) {
            getAllGroups(user).then(res => setGroups(res))
        }
        else auth.logout()
    }, [])

    useEffect(() => {
        if (group) {
            const user = auth.getCurrentUser()
            let res = window.confirm(`You're about to grant permission for this group to ${username}. Proceed?`)
            if (res) {
                if (user && user.access_token && user.role == 'ADMIN') {
                    GrantPermission(user, username, group).then(window.location.reload())
                } else {
                    auth.logout()
                }
            } else {
                //document.getElementById(styles.option).value = ""
                setGroup("")
            }
        }
    },[group])


    useEffect(() => {
        if (toRemove) {
            const user = auth.getCurrentUser()
            console.log(toRemove)
            let res = window.confirm(`You're about to remove ${username} from his/her groups. Proceed?`)
            if (res) {
                if (user && user.access_token && user.role == 'ADMIN') {
                    RemoveFromGroup(user, toRemove).then(window.location.reload())
                } else {
                    auth.logout()
                }
            } else {
                setToRemove("")
            }
        }
    },[toRemove])

    useEffect(() => {
        if (toReset) {
            const user = auth.getCurrentUser()
            let res = window.confirm("You're about to reset an employee's password. Proceed?")
            if (res) {
                if (user && user.access_token && user.role == "ADMIN") {
                    ResetPassword(user, toReset).then(result => {
                        alert(`${toReset}'s password is reset to: ${result}`)
                    })
                } else {
                    auth.logout()
                }
            } else {
                setToReset("")
            }
        }
    },[toReset])


    return (
        <>
        <AdminNavbar/>
        <div className={styles.container}>
            <AdminSidebar></AdminSidebar>
            <div className={styles.content}>
                {employees.filter((e => e.username!=="admin" && e.enable === true)).map(em =>
                    <><div className={styles.titleContainer}>
                            {em.username === "admin" ? <></> :
                                <div>
                                    <button className={styles.buttonRemove} onClick={(e) => setToRemove(em.username)}>Remove</button>
                                    <button className={styles.buttonRemove} onClick={(e) => setToReset(em.username)}>Reset</button>
                                    <select defaultValue="" className={styles.grant} onChange={(e) => {
                                        setGroup(e.target.value);
                                        setUsername(em.username)     
                                    }}>
                                        <option key="grant" value="">---Grant---</option>
                                        {groups.map((g) => <option key={g.key} value={g.key}>{g.name}</option>)}
                                    </select>
                                   <button onClick={() => navigate(`/admin/${em.username}/log`)} className={styles.buttonRemove}>Log</button>
                                </div>
                            }
                        </div>
                        <div className={styles.infoContainer}>
                            <div className={styles.info}>
                                <div className={styles.infoTop}>
                                    <img
                                        src="https://static.serato.com/common/images/account-icon.svg"
                                        alt=""
                                        className={styles.userImg}
                                    />
                                    <div className={styles.infoTopTitle}>
                                        <span className={styles.fullname}>{em.fullname}</span>
                                        <span className={styles.role}>Chức vụ: {em.username !== "admin" ? "Nhân viên" : "Quản trị viên"}</span>
                                    </div>
                                </div>
                                <div className={styles.infoBot}>
                                    <span className={styles.infoBotTitle}>Tài khoản</span>
                                    <div className={styles.accountInfo}>
                                        <FaRegUser className={styles.infoIcon} />
                                        <span className={styles.accountInfoItem}>{em.username}</span>
                                    </div>
                                    <span className={styles.infoBotTitle}>Quyền quản lí</span>
                                    {
                                        em.groups.map((group) => {
                                            return (
                                                <div key={group} className={styles.accountInfo}>
                                                    <GiEggClutch className={styles.infoIcon} />
                                                    <span className={styles.accountInfoItem}>{group}</span>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                            <div className={styles.updateContainer}>
                                <form className={styles.updateForm}>
                                    <div className={styles.formLeft}>
                                        <div className={styles.updateItem}>
                                            <label>Họ và tên</label>
                                            <div>
                                                <input type="text" placeholder={em.fullname} disabled={true} />
                                            </div>
                                        </div>
                                        <div className={styles.updateItem}>
                                            <label>Ngày sinh</label>
                                            <div>
                                                <input type="text" placeholder={em.dob} disabled={true} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br></br></>
                )}
            </div>
        </div>
        </>
    )
}