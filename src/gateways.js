export const fetchUsersList = () => {
    return fetch(`http://77.120.241.80:8911/api/users`)
        .then(response => response.json())
        .catch(err => alert(err))
}

export const createUser = userData => {
    return fetch('http://77.120.241.80:8911/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(userData),
    })
}

export const updateUser = (userId, updateUserData) => {
    console.log(userId)
    return fetch(`http://77.120.241.80:8911/api/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(updateUserData)
    }).catch(err => alert(err))
}

export const deleteUser = (userId) => {
    return fetch(`http://77.120.241.80:8911/api/user/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
    }).catch(err => alert(err))
}