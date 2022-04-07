const SetLightState = (user,light,groupInfo)=>{
    var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.access_token}`)
            myHeaders.append("Content-Type", "application/json")
            const value = groupInfo.lightState ? "0" : "1"
            var raw = JSON.stringify({
                "value": value
            })
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            }

            fetch(`http://localhost:8080/api/v1/feeds/${light.key}/data`, requestOptions)
                .then(response => {
                    if (response.status === 200)
                        return response.text()
                    throw new Error(response.status)
                })
                .then(result => console.log("change light state"))
                .catch(error => console.log('error', error))
}
export default SetLightState