import { groupsAPI } from './groupAPI'
const GetAllFeedsInGroup = (user, groupKey) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.access_token}`);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${groupsAPI}/${groupKey}/feeds`, requestOptions)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            }
            throw new Error(response.status)
        })
        .then(result => result
        )
        .catch(error => console.log('error', error))
}
export default GetAllFeedsInGroup