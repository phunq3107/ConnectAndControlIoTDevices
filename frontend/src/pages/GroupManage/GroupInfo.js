import { useContext, useEffect, useState } from "react";
import { FaAngleRight, FaArrowDown, FaArrowUp, FaExchangeAlt, FaLightbulb, FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { IoIosEgg, IoIosSunny } from "react-icons/io";
import { MdOutlineAutofpsSelect, MdOutlineSensors } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { IncubatorCell } from "../../components";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import { AuthContext } from "../../services/authorization/AuthContext";
import { getCurrentDay, getCurrentStage } from "../../services/datahandler";
import { getAllGroups, getGroupInfo } from "../../services/groupsAPI";
import GetAccountInfo from "../../services/userAPI/GetAccountInfo";
import GetAllAccounts from "../../services/userAPI/GetAllAccounts";
import GrantPermission from "../../services/userAPI/GrantPermission";
import styles from './GroupManage.module.css'
export default function GroupInfo () {
    const auth = useContext(AuthContext)
    const {key} = useParams();
    const [group, setGroup] = useState({})
    const [manager, setManager] = useState({})
    const [employee, setEmployee] = useState('')
    const [employees, setEmployees] = useState([])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token && user.role === "ADMIN") {
            getGroupInfo(user, key).then(res => setGroup(res))
        }
        else auth.logout()
    }, [])
    useEffect(() => {
        if(group && Object.keys(group).length !== 0) {
            const user = auth.getCurrentUser()
            if (user && user.access_token && user.role ==="ADMIN") {
                GetAccountInfo(user, group.employee).then(res => setManager(res))
            }
            else auth.logout()
        }
    }, [group])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token && user.role == 'ADMIN') {
            GetAllAccounts(user).then(employees => setEmployees(employees))
        } else {
            auth.logout()
        }
    }, [])
    useEffect(() => {
        if (employee) {
            const user = auth.getCurrentUser()
            let res = window.confirm(`You're about to grant permission for this group to ${employee}. Proceed?`)
            if (res) {
                if (user && user.access_token && user.role == 'ADMIN') {
                    GrantPermission(user, employee, key).then(window.location.reload())
                } else {
                    auth.logout()
                }
            } else {
                //document.getElementById(styles.option).value = ""
                setEmployee("")
            }
        }
    },[employee])


    const handleSwap = () => {
        document.getElementById(styles.manage).classList.toggle(styles.swap);
        document.getElementById(styles.useroption).classList.toggle(styles.swapoption);
    }
    
    return (
        <>
        <AdminNavbar/>
        <div className={styles.container}>
            <AdminSidebar></AdminSidebar>
            <div className={styles.content}>
                
                <h1 className={styles.title}>Người quản lý</h1>
                <div className={styles.hrpart}>
                { group.employee ? ( 
                <div className={styles.info} id={styles.manage}>
                                <div className={styles.infoTop}>
                                    <div id={styles.exchange}onClick={handleSwap}>
                                        <FaExchangeAlt id={styles.iconexchange}></FaExchangeAlt>
                                    </div>
                                    <div>
                                    <img
                                        src="https://static.serato.com/common/images/account-icon.svg"
                                        alt=""
                                        className={styles.userImg}
                                    />
                                    </div>
                                    
                                </div>
                                <div className={styles.infoBot}>
                                    <span className={styles.infoBotTitle}>Tài khoản</span>
                                    <div className={styles.accountInfo}>
                                        <FaRegUser className={styles.infoIcon} />
                                        <span className={styles.accountInfoItem}>{manager.username}</span>
                                        
                                    </div>
                                    <span className={styles.infoBotTitle}>Họ và tên</span>
                                    <div className={styles.accountInfo}>
                                        <span className={styles.accountInfoItem}>{manager.fullname}</span>
                                    </div>
                                </div>
                                
                </div>) : <></>            
                }
                <div id={styles.useroption}>
                    <ul id="list">
                        {employees.filter(em => em.username !== manager.username && em.username !== "admin").map(em => {
                            return (
                                        <li key={em.username} value={em.username} className={styles.useritem} onClick={() => setEmployee(em.username)}>
                                            <FaRegUser></FaRegUser>
                                            <span>{em.username}</span>
                                        </li>
                                    )    
                            })}
                    </ul>
                </div>
                </div>
                <h1 className={styles.title}>Trạng thái Group</h1>
                <div className={styles.info}>
                    <div className={styles.stateContent}>
                <div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            Số trứng
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            Số ngày hoạt động
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            Nhiệt độ hiện tại
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            Tình trạng đèn
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            Chế độ tự động
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            Số thiết bị
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            Ngưỡng nhiệt độ
                        </span>
                    </div>
                </div>
                <div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            <IoIosEgg style={{ color: "#ffd79a" }} />{'\u00A0\u00A0'}
                            {group.noEggs ? group.noEggs + " trứng" : "Không xác định"}
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            <FaRegCalendarAlt />{'\u00A0\u00A0'}
                            {getCurrentDay(group.startTime)}
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            <IoIosSunny style={{ color: "orange", fontSize: "20px" }} />{'\u00A0\u00A0'}
                            {group.currentTemperature}<sup>o</sup>C
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            <FaLightbulb style={{ color: "#ffd633" }} />{'\u00A0\u00A0'}
                            {group.lightState === true ? "BẬT" : "TẮT"}
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            <MdOutlineAutofpsSelect style={{ color: "#2693e6" }} />{'\u00A0\u00A0'}
                            {group.enableAutomation === true ? "BẬT" : "TẮT"}
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            <MdOutlineSensors />{'\u00A0\u00A0'}
                            {group.noFeeds}
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            <FaArrowUp style={{ color: "#ef3038" }} />{'\u00A0\u00A0'}{group.upperThreshold}<sup>o</sup>C{'\u00A0\u00A0'}
                            <FaArrowDown style={{ color: "#4169e1" }} />{'\u00A0\u00A0'} {group.lowerThreshold}<sup>o</sup>C
                        </span>
                    </div>
                </div>
                <div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            <span className={styles.subTitle}>{group.hatchedEgg ? " Có trứng nở" : "Chưa có trứng nở"}</span>
                        </span>
                    </div>
                    <div className={styles.stateContainer}>
                        <span className={styles.state}>
                            <span className={styles.subTitle}>{group.startTime ? getCurrentStage(group.startTime, group.threshold) : null}</span>
                        </span>
                    </div>
                </div>
            </div>
                </div>
            </div>
        </div>
        </>
    )
}