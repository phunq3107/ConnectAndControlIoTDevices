import { accountsAPI } from "./accountsAPI";

const UpdateUserInfo = (user, newInfo) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.access_token}`)
    myHeaders.append("Content-Type", "application/json")
    var raw = JSON.stringify({
        ...newInfo
    })
    
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    return fetch(`${accountsAPI}/${user.username}`, requestOptions)
        .then(response => {
            if (response.status === 200)
                return response.text()
            throw new Error(response.status)
        })
        .then(result => console.log("change user info"))
        .catch(error => console.log('error', error))
}
export default UpdateUserInfo