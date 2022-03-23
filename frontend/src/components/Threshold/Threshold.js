import styles from './threshold.module.css'
import { useState, useContext } from 'react'
import LoginInput from './../LoginForm/LoginInput'
import { AuthContext } from '../../AuthContext'
function Threshold({ incubatorKey }) {
    const [upper, setUpper] = useState()
    const [lower, setLower] = useState()
    const auth = useContext(AuthContext)
    const handleThreshold = () => {
        if (lower && upper && lower <= upper) {
            const user = auth.getCurrentUser()
            if (user && user.access_token) {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${user.access_token}`)
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "lower": lower,
                    "upper": upper
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`http://localhost:8080/api/v1/groups/${incubatorKey}/threshold`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log("thay doi nguong")
                        setUpper()
                        setLower()
                    })
                    .catch(error => console.log('error', error));
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