const initialState = {
    usersList: {},
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS_LIST':
            return {
                ...state,
                usersList: action.payload,
            }
        default:
            return state;
    }
}

export default usersReducer;