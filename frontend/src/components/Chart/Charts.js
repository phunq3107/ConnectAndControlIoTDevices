import Chart from "./Chart"
import styles from './chart.module.css'
import { useEffect, useContext, useRef, useState } from 'react'
import { AuthContext } from "../../AuthContext"
function Charts({ tempSensor, soundSensor }) {
    const auth = useContext(AuthContext)
    const [tempData, setTempData] = useState([])
    const [soundData, setSoundData] = useState([])
    const prevTempData = useRef()
    const prevSoundData = useRef()
    useEffect(() => {
        prevTempData.current = tempData
    }, [tempData])
    useEffect(() => {
        prevSoundData.current = soundData
    }, [soundData])

    useEffect(() => {
        const user = auth.getCurrentUser()
        const yesterday = new Date(new Date().getTime() - 3 * 60 * 60 * 1000).toISOString().slice(0, -5)
        if (user && user.access_token) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.access_token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`http://localhost:8080/api/v1/feeds/${tempSensor.key}/data?start_time=${yesterday}`, requestOptions)
                .then(response => response.text())
                .then(result => setTempData(JSON.parse(result)))
                .catch(error => console.log('error', error));
        }
        else auth.logout()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const user = auth.getCurrentUser()
            const now = new Date(new Date().getTime() - 5000).toISOString().slice(0, -5)
            if (user && user.access_token) {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${user.access_token}`);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch(`http://localhost:8080/api/v1/feeds/${tempSensor.key}/data?start_time=${now}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        const [, ...rest] = prevTempData.current
                        setTempData([...rest, ...JSON.parse(result)])
                    })
                    .catch(error => console.log('error', error));
            }
            else auth.logout()
        }, 5000)
        return () => clearInterval(interval)
    }, [])
    useEffect(() => {
        const user = auth.getCurrentUser()
        const yesterday = new Date(new Date().getTime() - 3 * 60 * 60 * 1000).toISOString().slice(0, -5)
        if (user && user.access_token) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.access_token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`http://localhost:8080/api/v1/feeds/${soundSensor.key}/data?start_time=${yesterday}`, requestOptions)
                .then(response => response.text())
                .then(result => setSoundData(JSON.parse(result)))
                .catch(error => console.log('error', error));
        }
        else auth.logout()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const user = auth.getCurrentUser()
            const now = new Date(new Date().getTime() - 5000).toISOString().slice(0, -5)
            if (user && user.access_token) {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${user.access_token}`);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch(`http://localhost:8080/api/v1/feeds/${soundSensor.key}/data?start_time=${now}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result)
                        const [, ...rest] = prevSoundData.current
                        setSoundData([...rest, ...JSON.parse(result)])
                    })
                    .catch(error => console.log('error', error));
            }
            else auth.logout()
        }, 5000)
        return () => clearInterval(interval)
    }, [])
    const charts = [
        {
            title: "Biểu đồ nhiệt độ",
            data: tempData,
            XdataKey: "createdAt",
            YdataKey: "value",
        },
        {
            title: "Biểu đồ âm thanh",
            data: soundData,
            XdataKey: "createdAt",
            YdataKey: "value",
        },
    ]
    if (tempData && soundData) {
        return (
            <div className={styles.container}>
                {charts.map(chart =>
                    <Chart key={chart.title} title={chart.title} data={chart.data} XdataKey={chart.XdataKey} YdataKey={chart.YdataKey} />)}
            </div>
        )
    }
    else return null
}
export default Charts