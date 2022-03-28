export const LightDataFormatter = (lightData, idx) => {
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
    return lightData
}