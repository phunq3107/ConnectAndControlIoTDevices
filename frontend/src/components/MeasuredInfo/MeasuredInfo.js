import styles from "./measuredInfo.module.css"
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from "../../AuthContext"
function MeasuredInfo({ incubatorKey }) {
    const auth = useContext(AuthContext)
    const [incubatorInfo, setIncubatorInfo] = useState()
    useEffect(() => {
        const interval = setInterval(() => {
            const user = auth.getCurrentUser()
            if (user && user.access_token) {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${user.access_token}`);
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                fetch(`http://localhost:8080/api/v1/groups/${incubatorKey}`, requestOptions)
                    .then(response => {
                        if (response.status === 200) {
                            return response.json()
                        }
                        throw new Error(response.status)
                    })
                    .then(result => {
                        setIncubatorInfo(result)
                    })
                    .catch(error => console.log('error', error))
            }
            else {

            }
        }, 5000)
        return () => clearInterval(interval)
    }, [])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.access_token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(`http://localhost:8080/api/v1/groups/${incubatorKey}`, requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    throw new Error(response.status)
                })
                .then(result => {
                    setIncubatorInfo(result)
                })
                .catch(error => console.log('error', error))
        }
        else {

        }
    }, [])
    if (incubatorInfo)
        return (
            <div className={styles.container}>
                <div className={styles.measuredItem}>
                    <span className={styles.title}>Nhiệt độ hiện tại</span>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>{incubatorInfo.currentTemperature}<sup>o</sup>C</span>
                    </div>
                    <span className={styles.subTitle}>Upper {incubatorInfo.upperThreshold}<sup>o</sup>C - Lower {incubatorInfo.lowerThreshold}<sup>o</sup>C</span>
                </div>
                <div className={styles.measuredItem}>
                    <span className={styles.title}>Số trứng</span>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>20 trứng</span>
                    </div>
                    <span className={styles.subTitle}>{incubatorInfo.hatchedEgg ? "Có trứng nở" : "Chưa có trứng nở"}</span>
                </div>
                <div className={styles.measuredItem}>
                    <span className={styles.title}>Số ngày hoạt động</span>
                    <div className={styles.infoContainer}>
                        <span className={styles.info}>10 ngày</span>
                    </div>
                    <span className={styles.subTitle}></span>
                </div>
            </div>
        )
    else return null
}
export default MeasuredInfo