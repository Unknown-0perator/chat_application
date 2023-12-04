const initialState = {
    searchedUserData: {},
};

const searchedUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_DATA':
            return {
                ...state,
                searchedUserData: action.payload,
            };
        default:
            return state;
    }
};

export default searchedUserReducer;
