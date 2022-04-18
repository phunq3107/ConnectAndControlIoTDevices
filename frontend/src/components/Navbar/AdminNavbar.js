import React, { useContext } from 'react'
import styles from './AdminNavbar.module.css'
import logo from './../../assets/logo.png'
import { AuthContext } from '../../services/authorization/AuthContext'
export default function AdminNavbar() {
    const auth = useContext(AuthContext)
    const user = auth.getCurrentUser()
  return(
    <div className={styles.Header}>
        <div href="#" className={styles.Logo}>
            <img src ={logo} alt="Logo" style={{width : '70px', height: '70 px'}}/>
        </div>
        <div >
            <span className={styles.title}>Welcome to the EggIncubator, {user.username}!</span>
        </div>
    </div>
   )
}