import styles from './light.module.css'
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, Tooltip, Legend, Scatter } from 'recharts'
import { AuthContext } from '../../AuthContext'
import { useEffect, useContext, useState,useRef} from 'react'
function LightChart({ light }) {
    const auth = useContext(AuthContext)
    const [lightData, setLightData] = useState([])
    const prevData = useRef()
    useEffect(()=>{
        prevData.current = lightData
    },[lightData])

    useEffect(() => {
        const user = auth.getCurrentUser()
        const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, -5)
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
                .then(result => setLightData(JSON.parse(result)))
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

                fetch(`http://localhost:8080/api/v1/feeds/${light.key}/data?start_time=${now}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {  
                        const [,...rest] = prevData.current 
                        setLightData([...rest,...JSON.parse(result)])
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
                        <XAxis dataKey="createdAt" interval={0} allowDataOverflow={false} />
                        <YAxis dataKey="value" ticks={[0, 1]} tickFormatter={(value) => value === 1 ? 'ON' : 'OFF'} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <Scatter data={lightData} fill="#8884d8" line shape={<></>} />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        )
    }
    else return null
}
export default LightChart