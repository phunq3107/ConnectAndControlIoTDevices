import styles from './threshold.module.css'
import { useState, useContext } from 'react'
import LoginInput from './../LoginForm/LoginInput'
import { AuthContext } from '../../services/authorization/AuthContext'
import { setThreshold } from '../../services/groupsAPI'
function Threshold({ incubatorKey }) {
    const [upper, setUpper] = useState()
    const [lower, setLower] = useState()
    const auth = useContext(AuthContext)
    const handleThreshold = () => {
        if (lower && upper && lower <= upper) {
            const user = auth.getCurrentUser()
            if (user && user.access_token) {
                setThreshold(user, incubatorKey, upper, lower).then(res => {
                    setUpper()
                    setLower()
                })
            }
            else auth.logout()
        }
    }
    return (
        <div className={styles.container}>
            <div>
                <LoginInput
                    label="Ngưỡng trên"
                    placeholder=""
                    type="number"
                    value={upper || ''}
                    onChange={(e) => setUpper(e.target.value)}
                />
                <LoginInput
                    label="Ngưỡng dưới"
                    placeholder=""
                    type="number"
                    value={lower || ''}
                    onChange={(e) => setLower(e.target.value)}
                />
                <div>
                    <button className={styles.button} onClick={handleThreshold}>Xác nhận</button>
                </div>
            </div>
        </div>
    )
}
export default Threshold