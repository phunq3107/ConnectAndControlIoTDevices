const CreateNewUser = (user, newuser) => {
    var myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${user.access_token}`)
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(newuser),
        redirect: 'follow'
    }

    return fetch(`http://localhost:8080/api/v1/accounts`, requestOptions)
        .then(response => {
            if (response.status === 200) {
                return response.text()
            }
            throw new Error(response.status)
        })
        .then(result => result)
        .catch(error => console.log('error', error))
}
export default CreateNewUser