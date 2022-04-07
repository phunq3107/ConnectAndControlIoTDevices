const GetGroupInfo = (user, groupKey) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.access_token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`http://localhost:8080/api/v1/groups/${groupKey}`, requestOptions)
        .then(response => {
            if (response.status === 200)
                return response.json()
            throw new Error(response.status)
        })
        .then(result => result)
        .catch(error => console.log('error', error))
}
export default GetGroupInfo