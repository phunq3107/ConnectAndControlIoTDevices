const SetLightAutomation = (user,incubatorKey,groupInfo) =>{
    var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.access_token}`);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "key": incubatorKey,
                "value": !groupInfo.enableAutomation
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:8080/api/v1/groups/automation", requestOptions)
                .then(response => {
                    if (response.status === 200)
                        return response.text()
                    throw new Error(response.status)
                })
                .then(result => console.log("Change automation"))
                .catch(error => console.log('error', error));
}
export default SetLightAutomation