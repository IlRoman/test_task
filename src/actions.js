import { fetchUsersList, createUser, updateUser, deleteUser } from './gateways';

export const usersListReceived = usersList => ({
    type: 'GET_USERS_LIST',
    payload: {
        usersList,
    }
})

export const getUsersList = () => {
    const thunkAction = function (dispatch) {
        fetchUsersList()
            .then(usersList => {
                dispatch(usersListReceived(usersList))
            })
    };
    return thunkAction;
}

export const onCreateUser = (name, surname) => {
    const newUser = {
        name: name,
        surname: surname,
        desc: 'desc',
    }
    const thunkAction = function (dispatch) {
        createUser(newUser)
            .then(() => dispatch(getUsersList()))
    }
    return thunkAction;
}

export const onChangeUser = (userId, name, surname) => {
    let updatedUser = {}
    const thunkAction = function (dispatch, getState) {
        const usersList = getState()
        const user = usersList.usersList.usersList.usersList.find(
            user => user.id === userId,
        )

        if (!name) {
            updatedUser = {
                ...user,
                surname: surname,
            }
        }

        if (!surname) {
            updatedUser = {
                ...user,
                name: name,
            }
        }

        if (!name && !surname) {
            updatedUser = {
                ...user,
            }
        }

        if (name && surname) {
            updatedUser = {
                ...user,
                name: name,
                surname: surname,
            }
        }

        updateUser(userId, updatedUser)
            .then(() => dispatch(getUsersList()))
    };
    return thunkAction;
}

export const onDeleteUser = (userId) => {
    const thunkAction = function (dispatch) {
        deleteUser(userId)
            .then(usersList => dispatch(getUsersList(usersList)))
    };
    return thunkAction;
}