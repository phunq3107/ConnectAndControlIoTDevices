const FormatLightData = (lightData, idx) => {
    if (idx < 0)
        idx = 0
    if (lightData && lightData.length > 1) {
        for (var i = idx; i < lightData.length - 1; i++) {
            if (lightData[i + 1].value !== lightData[i].value && lightData[i + 1].createdAt !== lightData[i].createdAt) {
                const connectPoint = {
                    createdAt: lightData[i + 1].createdAt,
                    value: lightData[i].value
                }
                lightData.splice(i + 1, 0, connectPoint)
                i++
            }
        }
    }
    else if (lightData && lightData.length === 1) {
        const connectPoint = {
            createdAt: lightData[0].createdAt,
            value : lightData[0] === 1 ? 0 : 1
        }
        lightData.splice(0,0,connectPoint)
    }
    return lightData
}
export default FormatLightData