import styles from './sidebar.module.css'
import {Link} from 'react-router-dom'
function MenuItem({title,link}) {
    return (
        <Link to={link} className={styles.link}>
            <li className={styles.listItem}>
                <i className={styles.icon} />
                {title}
            </li>
        </Link>
    )
}
export default MenuItem