const SetThreshold = (user,incubatorKey,upper,lower) => {
    var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${user.access_token}`)
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "lower": lower,
                    "upper": upper
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                return fetch(`http://localhost:8080/api/v1/groups/${incubatorKey}/threshold`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log("thay doi nguong")
                    })
                    .catch(error => console.log('error', error));
}
export default SetThreshold