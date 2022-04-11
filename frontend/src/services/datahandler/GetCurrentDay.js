const GetCurrentDay = (startTime) => {
    if (startTime === null)
        return "Không xác định"
    return Math.floor((new Date().getTime() - new Date(startTime).getTime()) / 86400000) + " ngày"
}
export default GetCurrentDay