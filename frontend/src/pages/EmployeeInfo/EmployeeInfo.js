import { Navbar, Sidebar } from '../../components'
import styles from './employeeInfo.module.css'
import { AuthContext } from '../../services/authorization/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { getInfoByUsername, updateUserInfo } from '../../services/accountsAPI'
import { BsCalendarEvent } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { GiEggClutch } from 'react-icons/gi'
import UpdateItem from '../../components/UpdateItem/UpdateItem'
function EmployeeInfo() {
    const auth = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState()
    const [dob, setDob] = useState('')
    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [disabledEditItems, setDisabledEditItems] = useState({ "Mật khẩu": true, "Họ và tên": true, "Ngày sinh": true })
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token) {
            getInfoByUsername(user).then((res) => setUserInfo({ ...res, role: user.role }))
        }
        else auth.logout()
    }, []);
    const renderUpdateItem = ({ label, ...inputProps }) => {
        return (
            <div className={styles.updateItem}>
                <label>{label}</label>
                <div>
                    <input {...inputProps} />
                    {
                        label !== "Tên tài khoản" ?
                            <button
                                className={styles.editButton}
                                onClick={(e) => handleEdit(e, label)}
                            >
                                Chỉnh sửa</button> :
                            null
                    }
                </div>
            </div>
        )
    }
    const handleEdit = (e, label) => {
        e.preventDefault()
        setDisabledEditItems(prev => {
            if (prev[label] === false) {
                if (label === "Mật khẩu")
                    setPassword('')
                else if (label === "Họ và tên")
                    setFullname('')
                else setDob('')
            }
            return { ...prev, [label]: !prev[label] }
        })
    }
    const handleUpdate = (e, newDob, newFullname, newPassword) => {
        const user = auth.getCurrentUser()
        if (user && user.access_token) {
            if (!disabledEditItems["Họ và tên"] && newFullname.length < 1) {
                e.preventDefault()
                alert("Tên không hợp lệ")
            }
            else if (!disabledEditItems["Mật khẩu"] && newPassword.length < 6) {
                e.preventDefault()
                alert("Mật khẩu quá ngắn")
            }
            else if (!disabledEditItems["Họ và tên"] || !disabledEditItems["Mật khẩu"] || !disabledEditItems["Ngày sinh"]) {
                const info = { "dob": newDob, "fullname": newFullname, "password": newPassword }
                const filteredInfo = Object.entries(info).filter(([key, value]) => value !== "")
                const sentInfo = Object.fromEntries(filteredInfo)
                updateUserInfo(user, sentInfo)
            }
            else e.preventDefault()
        }
        else auth.logout()
    }
    if (userInfo) {
        console.log(disabledEditItems)
        return (
            <>
                <Navbar />
                <div className={styles.container}>
                    <Sidebar />
                    <div className={styles.content}>
                        <div className={styles.titleContainer}>
                            <h1 className={styles.title}>Thông tin cá nhân</h1>
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
                                        <span className={styles.fullname}>{userInfo.fullname}</span>
                                        <span className={styles.role}>Chức vụ: {userInfo.role === "EMPLOYEE" ? "Nhân viên" : "Quản trị viên"}</span>
                                    </div>
                                </div>
                                <div className={styles.infoBot}>
                                    <span className={styles.infoBotTitle}>Tài khoản</span>
                                    <div className={styles.accountInfo}>
                                        <FaRegUser className={styles.infoIcon} />
                                        <span className={styles.accountInfoItem}>{userInfo.username}</span>
                                    </div>
                                    <div className={styles.accountInfo}>
                                        <BsCalendarEvent className={styles.infoIcon} />
                                        <span className={styles.accountInfoItem}>{userInfo.dob && userInfo.dob.split('-').reverse().join('-')}</span>
                                    </div>
                                    <span className={styles.infoBotTitle}>Quyền quản lí</span>
                                    {
                                        userInfo.groups.map((group) => {
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
                                <span className={styles.updateTitle}>Chỉnh sửa</span>
                                <form className={styles.updateForm}>
                                    <div className={styles.formLeft}>
                                        <UpdateItem
                                            label="Tên tài khoản"
                                            type="text"
                                            placeholder={userInfo.username}
                                            disabled={true}
                                        />
                                        <UpdateItem
                                            label="Mật khẩu"
                                            handleEdit={handleEdit}
                                            type="password"
                                            placeholder="********"
                                            disabled={disabledEditItems["Mật khẩu"]}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required={true}
                                        />
                                        <UpdateItem
                                            label="Họ và tên"
                                            handleEdit={handleEdit}
                                            type="text"
                                            placeholder={userInfo.fullname}
                                            disabled={disabledEditItems["Họ và tên"]}
                                            className={styles.updateInput}
                                            value={fullname}
                                            onChange={e => setFullname(e.target.value)}
                                            required={true}
                                        />
                                        <UpdateItem
                                            label="Ngày sinh"
                                            handleEdit={handleEdit}
                                            type="date"
                                            disabled={disabledEditItems["Ngày sinh"]}
                                            className={styles.updateInput}
                                            min="1950-01-01"
                                            max="2022-01-01"
                                            required={true}
                                            onChange={e => setDob(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formRight}>
                                        <div className={styles.rightImgcontainer}>
                                            <img
                                                className={styles.rightImg}
                                                src="https://static.serato.com/common/images/account-icon.svg"
                                                alt=""
                                            />
                                        </div>
                                        {
                                            Object.entries(disabledEditItems).some(([key, value]) => value === false) ?
                                                <button
                                                    className={styles.updateButton}
                                                    onClick={(e) => handleUpdate(e, dob, fullname, password)}
                                                >
                                                    Cập nhật
                                                </button> : null}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
    else return null
}
export default EmployeeInfo