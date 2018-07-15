const app_reducer = (state = {}, action) => {
    
    switch (action.type) {
        case 'FETCH_DATA':
            const newState = Object.assign({}, ...state, action.payload.data);
            return newState;
        default:
            return state;
    }
};

export default app_reducer;