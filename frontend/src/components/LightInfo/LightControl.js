import styles from './light.module.css'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../AuthContext';
import Switch from 'react-switch'
function LightConTrol({ light, incubatorKey }) {
    const [lightInfo, setLightInfo] = useState()
    const auth = useContext(AuthContext)
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
                        if (response.status === 200)
                            return response.json()
                        throw new Error(response.status)
                    })
                    .then(result => setLightInfo(result))
                    .catch(error => console.log('error', error))
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
                    if (response.status === 200)
                        return response.json()
                    throw new Error(response.status)
                })
                .then(result => setLightInfo(result))
                .catch(error => console.log('error', error))
        }
    }, [])
    const handleLightState = () => {
        const user = auth.getCurrentUser()
        if (user && user.access_token) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.access_token}`)
            myHeaders.append("Content-Type", "application/json")
            const value = lightInfo.lightState ? "0" : "1"
            var raw = JSON.stringify({
                "value": value
            })

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            }

            fetch(`http://localhost:8080/api/v1/feeds/${light.key}/data`, requestOptions)
                .then(response => {
                    if (response.status === 200)
                        return response.text()
                    throw new Error(response.status)
                })
                .then(result => console.log("change light state"))
                .catch(error => console.log('error', error))
        }
        else auth.logout()
    }
    const handleEnableAutomation = () => {
        const user = auth.getCurrentUser()
        if (user && user.access_token) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.access_token}`);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "key": incubatorKey,
                "value": !lightInfo.enableAutomation
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:8080/api/v1/groups/automation", requestOptions)
                .then(response => {
                    if (response.status === 200)
                        return response.text()
                    throw new Error(response.status)
                })
                .then(result => console.log("Change automation"))
                .catch(error => console.log('error', error));
        }
        else auth.logout()
    }
    if (lightInfo) {
        return (
            <div className={styles.lightControl}>
                <h3 className={styles.title}>Điều khiển đèn</h3>
                <div>
                    <div>Tình trạng đèn {lightInfo.lightState ? "BẬT" : "TẮT"} </div>
                    <div>
                        <div>Điều khiển đèn tự động</div>
                        <Switch onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={50}
                            onChange={handleEnableAutomation}
                            checked={lightInfo.enableAutomation}
                        />
                    </div>
                    <div>
                        <div>Điều khiển đèn thủ công</div>
                        <Switch onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={50}
                            onChange={handleLightState}
                            checked={lightInfo.lightState}
                            disabled = {lightInfo.enableAutomation}
                        />
                    </div>

                </div>
            </div>
        )
    }
    else return null
}
export default LightConTrol