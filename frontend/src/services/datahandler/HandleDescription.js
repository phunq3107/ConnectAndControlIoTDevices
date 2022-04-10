const HandleDescription = (description) => {
    const [groupPart, descPart] = description.split(':')
    const group = groupPart.slice(1, -1).split(' ').slice(-1)[0]
    let res = ""
    console.log(descPart)
    if (descPart.includes("-> close")) {
        if (descPart.includes("light"))
            res = "Tắt đèn "
        else res = "Tắt chế độ tự động "
    }
    else if (descPart.includes("-> open")) {
        if (descPart.includes("light"))
            res = "Bật đèn "
        else res = "Bật chế độ tự động"
    }
    else res = "Tạo chu kì ấp trứng mới"
    return "Lồng " + group + ": " + res
}
export default HandleDescription