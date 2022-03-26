import React from 'react'
import styles from './AdminNavbar.module.css'
import logo from './../../assets/logo.png'
export default function AdminNavbar(props) {
  return(
    <div className={styles.Header}>
        <div href="#" className={styles.Logo}>
            <img src ={logo} alt="Logo" style={{width : '70px', height: '70 px'}}/>
        </div>
        <ul className={styles.Menu}>
            <li className={props.home ? styles.active : ''}><a href ="/#">Home</a></li>
            <li className={props.info ? styles.active : ''}><a href="/#">Info</a></li>
            <li className={props.about ? styles.active : ''}><a href="/#">About Us</a></li>
        </ul>
        <div className="user-nav">
            <a href="/#" className="user-icon"><i className="fas fa-user"></i></a>
        </div>
    </div>
   )
}