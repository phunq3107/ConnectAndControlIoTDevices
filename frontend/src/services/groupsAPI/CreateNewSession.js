import { groupsAPI } from './groupAPI'
const createNewSession = (user, incubatorKey, id, noEgg) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.access_token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "noEgg": noEgg,
        "thresholdId": id
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`${groupsAPI}/${incubatorKey}/session`, requestOptions)
        .then(response => {
            if (response.status === 200)
                return response.text()
            throw new Error(response.status)
        })
        .then(result => console.log("Thiet lap chu ki moi"))
        .catch(error => console.log('error', error));
}
export default createNewSession