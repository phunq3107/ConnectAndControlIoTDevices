import styles from './light.module.css'
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, Tooltip, Legend, Scatter } from 'recharts'
import { AuthContext } from '../../AuthContext'
import { useEffect, useContext, useState, useRef } from 'react'
import { LightDataFormatter } from './LightDataFormatter'
function LightChart({ light }) {
    const auth = useContext(AuthContext)
    const [lightData, setLightData] = useState([])
    const prevData = useRef()
    useEffect(() => {
        prevData.current = lightData
    }, [lightData])

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

            fetch(`http://localhost:8080/api/v1/feeds/${light.key}/data?start_time=${yesterday}`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    setLightData((prev) => {
                        return LightDataFormatter(JSON.parse(result), 0)
                    })
                })
                .catch(error => console.log('error', error));
        }
        else auth.logout()
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            const user = auth.getCurrentUser()
            const now = new Date(new Date().getTime() - 10000).toISOString().slice(0, -5)
            if (user && user.access_token) {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${user.access_token}`);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch(`http://localhost:8080/api/v1/feeds/${light.key}/data?start_time=${now}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        const res = JSON.parse(result)
                        while (res.length > 0 && prevData.current.length > 0 && res[0].createdAt === prevData.current[prevData.current.length-1].createdAt){
                            res.shift()
                        }
                        if (res.length > 0) {
                            const [first, ...rest] = prevData.current
                            if (first && (new Date(first.createdAt).getTime() - new Date().getTime > 10800000))
                                setLightData(prev => {
                                    return LightDataFormatter([...rest, ...res], prevData.current.length - res.length)
                                })
                            else {
                                setLightData(prev => {
                                    return LightDataFormatter([...prevData.current, ...res], prevData.current.length - res.length)
                                })
                            }
                        }
                    })
                    .catch(error => console.log('error', error));
            }
            else auth.logout()
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    if (lightData) {
        return (
            <div className={styles.content}>
                <h3 className={styles.title}>Biểu đồ đèn</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <ScatterChart>
                        <XAxis
                            dataKey="createdAt"
                            interval={0}
                            stroke="#5550bd"
                            allowDataOverflow={false}
                            allowDuplicatedCategory={false}
                            tickFormatter={value=> value? value.substring(11) : 0}
                            ticks={lightData.length > 0 ? [lightData[0].createdAt, lightData[lightData.length-1].createdAt] : null}
                        />
                        <YAxis
                            dataKey="value"
                            ticks={[0, 1]}
                            stroke="#5550bd"
                            tickFormatter={(value) => value === 1 ? 'ON' : 'OFF'}
                        />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter data={lightData} fill="#5550bd" line />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        )
    }
    else return null
}
export default LightChart