import styles from './navbar.module.css'
import { AuthContext } from '../../AuthContext'
import { useContext } from 'react'
function Navbar({ incubatorKey }) {
    const auth = useContext(AuthContext)
    const user = auth.getCurrentUser()
    if (user.username) {
        return (
            <div className={styles.navbar}>
                <div className={styles.wrapper}>
                    <div>
                        <span className={styles.title}>Hello {user.username},{incubatorKey}</span>
                    </div>
                </div>
            </div>
        )
    }
    else return null
}
export default Navbar