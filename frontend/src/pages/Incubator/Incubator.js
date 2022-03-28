import MeasuredInfo from "../../components/MeasuredInfo/MeasuredInfo"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./incubator.module.css"
import Navbar from "../../components/Navbar/Navbar"
import Charts from "../../components/Chart/Charts"
import { useLocation } from "react-router-dom"
import LightInfo from "../../components/LightInfo/LightInfo"
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../AuthContext"
import Threshold from "../../components/Threshold/Threshold"
function Incubator() {
    const location = useLocation()
    const { incubatorKey } = location.state
    const auth = useContext(AuthContext)
    const [feeds, setFeeds] = useState()
    const [currentThreshold,setCurrentThreshold] = useState({})
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
            fetch(`http://localhost:8080/api/v1/groups/${incubatorKey}/feeds`, requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    throw new Error(response.status)
                })
                .then(result => {
                    setFeeds(result)
                })
                .catch(error => console.log('error', error))
        }
        else {
            auth.logout()
        }
    }, [])
    const handleThreshold = (upper,lower) =>{
        setCurrentThreshold({
            upper:upper,
            lower:lower
        })
    }
    if (feeds) {
        const [light] = feeds.filter(feed=>feed.type ==="Light")
        const [tempSensor] = feeds.filter(feed=>feed.type ==="TemperatureSensor")
        const [soundSensor] = feeds.filter(feed=>feed.type ==="SoundSensor")
        return (
            <>
                <Navbar incubatorKey={incubatorKey}/>
                <div className={styles.container}>
                    <Sidebar />
                    <div className={styles.content}>
                        <MeasuredInfo incubatorKey={incubatorKey} handleThreshold={handleThreshold} />
                        <Charts tempSensor={tempSensor} soundSensor={soundSensor} threshold={currentThreshold}/>
                        <LightInfo light={light} incubatorKey={incubatorKey}/>
                        <Threshold incubatorKey={incubatorKey}/>
                    </div>
                </div>
            </>
        )
    }
    else return null
}
export default Incubator