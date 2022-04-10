import { logAPI } from "./logAPI"
const GetLogByUsername = (user) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.access_token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${logAPI}/${user.username}`, requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .catch(error => console.log('error', error));
}
export default GetLogByUsername