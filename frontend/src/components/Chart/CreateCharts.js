const createCharts = (tempData, threshold, soundData) => {
    return [
        {
            title: "Biểu đồ nhiệt độ",
            data: tempData,
            XdataKey: "createdAt",
            YdataKey: "value",
            domain: [20, 50],
            threshold: threshold
        },
        {
            title: "Biểu đồ âm thanh",
            data: soundData,
            XdataKey: "createdAt",
            YdataKey: "value",
            domain: [0, 300]
        },
    ]
}
export default createCharts