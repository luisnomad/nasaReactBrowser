const uiState = (state = {}, action) => {
    
    switch (action.type) {
        case 'SET_CRITERIA':
            const newState = Object.assign(
                    {},
                    ...state,
                    {searchCriteria: action.payload}
                );

            return newState;
        default:
            return state;
    }
};

export default uiState;