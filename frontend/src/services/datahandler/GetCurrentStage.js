import { getCurrentDay } from './'
const GetCurrentStage = (startTime, threshold) => {
    if (startTime === null)
        return ""
    const currentDay = parseInt(getCurrentDay(startTime).split(' '))
    if (currentDay < threshold.numberDayOfStage1)
        return "Giai đoạn 1"
    else if (currentDay < threshold.numberDayOfStage2 + threshold.numberDayOfStage1)
        return "Giai đoạn 2"
    else return "Giai đoạn 3"
}
export default GetCurrentStage