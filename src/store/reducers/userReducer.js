// userReducer.js

const initialState = {
    profileData: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROFILE_DATA':
            return {
                ...state,
                profileData: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
