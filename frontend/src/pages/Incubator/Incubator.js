
import styles from "./incubator.module.css"
import { Navbar, Charts, Sidebar, MeasuredInfo, Threshold, LightInfo } from '../../components'
import { useLocation } from "react-router-dom"
import { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from "../../services/authorization/AuthContext"
import { getAllFeedsInGroup, getGroupInfo, getThresholds, setLightAutomation, createNewSession } from "../../services/groupsAPI"
import { getFeedData, setLightState } from "../../services/feedsAPI"
import { formatLightData, handleNewData } from "../../services/datahandler"
function Incubator() {
    const location = useLocation()
    const { incubatorKey } = location.state
    const auth = useContext(AuthContext)

    const [feeds, setFeeds] = useState()
    const [incubatorInfo, setIncubatorInfo] = useState()
    const [tempData, setTempData] = useState([])
    const [soundData, setSoundData] = useState([])
    const [lightData, setLightData] = useState([])
    const [thresholds, setThreshHolds] = useState()

    const light = useRef()
    const tempSensor = useRef()
    const soundSensor = useRef()

    const prevLightData = useRef([])
    useEffect(() => {
        prevLightData.current = lightData
    }, [lightData])

    const prevTempData = useRef()
    useEffect(() => {
        prevTempData.current = tempData
    }, [tempData])

    const prevSoundData = useRef()
    useEffect(() => {
        prevSoundData.current = soundData
    }, [soundData])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (user && user.access_token) {
            getAllFeedsInGroup(user, incubatorKey).then(feeds => {
                setFeeds(feeds)
            })
            getGroupInfo(user, incubatorKey).then(info => {
                setIncubatorInfo(info)
            })
            getThresholds(user).then(thresholds => {
                setThreshHolds(thresholds)
            })
        }
        else {
            auth.logout()
        }
    }, [])
    useEffect(() => {
        const user = auth.getCurrentUser()
        if (feeds && thresholds) {
            light.current = feeds.filter(feed => feed.type === "Light")[0]
            tempSensor.current = feeds.filter(feed => feed.type === "TemperatureSensor")[0]
            soundSensor.current = feeds.filter(feed => feed.type === "SoundSensor")[0]
            const threeHoursAgo = new Date(new Date().getTime() - 10800000).toISOString().slice(0, -5)
            if (user && user.access_token) {
                getFeedData(user, tempSensor.current, threeHoursAgo).then(data => {
                    setTempData(data)
                })
                getFeedData(user, soundSensor.current, threeHoursAgo).then(data => {
                    setSoundData(data)
                })
                getFeedData(user, light.current, threeHoursAgo).then(data => {
                    setLightData((prev) => {
                        return formatLightData(data, 0)
                    })
                })
            }
            else auth.logout()
        }
    }, [feeds])
    useEffect(() => {
        const interval = setInterval(() => {
            const user = auth.getCurrentUser()
            if (user && user.access_token) {
                getGroupInfo(user, incubatorKey).then(info => {
                    setIncubatorInfo(info)
                })
                if (light.current && prevLightData.current) {
                    const now = prevLightData.current && prevLightData.current.length < 1 ?
                        new Date(new Date().getTime() - 10000).toISOString().slice(0, -5) :
                        prevLightData.current[prevLightData.current.length - 1].createdAt
                    getFeedData(user, light.current, now).then(data => {
                        handleNewData(prevLightData.current, data, true, setLightData)
                    })
                }
                if (soundSensor.current && prevSoundData.current) {
                    const now = prevSoundData.current.length < 1 ?
                        new Date(new Date().getTime() - 10000).toISOString().slice(0, -5) :
                        prevSoundData.current[prevSoundData.current.length - 1].createdAt
                    getFeedData(user, soundSensor.current, now).then(data => {
                        handleNewData(prevSoundData.current, data, false, setSoundData)
                    })
                }
                if (tempSensor.current && prevTempData.current) {
                    const now = prevTempData.current.length < 1 ?
                        new Date(new Date().getTime() - 10000).toISOString().slice(0, -5) :
                        prevTempData.current[prevTempData.current.length - 1].createdAt
                    getFeedData(user, tempSensor.current, now).then(data => {
                        handleNewData(prevTempData.current, data, false, setTempData)
                    })
                }
            }
            else auth.logout()
        }, 5000)
        return () => clearInterval(interval)
    }, [])
    const handleLightState = () => {
        const user = auth.getCurrentUser()

        if (user && user.access_token) {
            
            setLightState(user, light.current, incubatorInfo)
        }
        else auth.logout()
    }
    const handleAutomation = () => {
        const user = auth.getCurrentUser()

        if (user && user.access_token) {
            setLightAutomation(user, incubatorKey, incubatorInfo)
        }
        else auth.logout()
    }
    const createSession = (id, noEgg) => {
        const user = auth.getCurrentUser()
        if (user && user.access_token) {
            createNewSession(user, incubatorKey, id, noEgg)
        }
    }


    if (feeds && incubatorInfo && thresholds) {
        return (
            <>
                <Navbar incubatorKey={incubatorKey} />
                <div className={styles.container}>
                    <Sidebar />
                    <div className={styles.content}>
                        <MeasuredInfo
                            incubatorInfo={incubatorInfo}
                        />
                        <Charts
                            tempData={tempData}
                            soundData={soundData}
                            threshold={{ upper: incubatorInfo.upperThreshold, lower: incubatorInfo.lowerThreshold }}
                        />
                        <LightInfo
                            incubatorInfo={incubatorInfo}
                            lightData={lightData}
                            handleLightState={handleLightState}
                            handleAutomation={handleAutomation}
                        />
                        <Threshold
                            thresholds={thresholds}
                            createNewSession={createSession}
                        />
                    </div>
                </div>
            </>
        )
    }
    else return null
}
export default Incubator