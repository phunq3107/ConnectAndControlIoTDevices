import styles from './sidebar.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../services/authorization/AuthContext'
function MenuItem({ title, link }) {
    const auth = useContext(AuthContext)
    const handleClick = (e, title) => {
        if (title === "Đăng xuất"){
            auth.logout()
        }
    }
    return (
        <Link to={link} className={styles.link} onClick={(e) => handleClick(e, title)}>
            <li className={styles.listItem}>
                <i className={styles.icon} />
                {title}
            </li>
        </Link>
    )
}
export default MenuItem