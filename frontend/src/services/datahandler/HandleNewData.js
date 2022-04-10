import { formatLightData } from "./"

const HandleNewData = (prevData, data, isLight, setData) => {
    if (data.length > 0 && prevData.length > 0) {
        data.shift()
    }
    if (data.length > 0) {
        const [first, ...rest] = prevData
        if (first && (new Date().getTime - new Date(first.createdAt).getTime() > 36000000)) {
            setData(prev => {
                return isLight ? formatLightData([...rest, ...data], prevData.length - 1) : setData([...rest, ...data])
            })
        }
        else {
            setData(prev => {
                return isLight ? formatLightData([...prevData, ...data], prevData.length - 1) : setData([...prevData, ...data])
            })
        }
    }
}
export default HandleNewData