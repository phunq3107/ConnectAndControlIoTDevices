const HandleActionData = (action) => {
    switch (action) {
        case "CONTROL_AUTOMATION":
            return "Thay đổi chế độ tự động"
        case "CONTROL_LIGHT":
            return "Điều khiển đèn"
        case "CREATE_INCUBATION_SESSION":
            return "Tạo chu kì ấp trứng mới"
        default:
            return ""
    }
}
export default HandleActionData