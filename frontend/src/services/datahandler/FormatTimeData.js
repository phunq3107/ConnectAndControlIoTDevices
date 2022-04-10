const FormatTimeData = (data) => {
    if (data.length < 8)
        return
    const [date,time] = data.split('T')
    const dateDisplayed = date.split('-').reverse().join('-')
    const timeDisplay = time.slice(0,8)
    return timeDisplay + ", ngày " + dateDisplayed
}
export default FormatTimeData