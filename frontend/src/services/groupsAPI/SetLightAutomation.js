import { groupsAPI } from './groupAPI'
const SetLightAutomation = (user, incubatorKey, groupInfo) => {
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
    return fetch(`${groupsAPI}/automation`, requestOptions)
        .then(response => {
            if (response.status === 200)
                return response.text()
            throw new Error(response.status)
        })
        .then(result => console.log("Automaton ON/OFF"))
        .catch(error => console.log('error', error));
}
export default SetLightAutomation