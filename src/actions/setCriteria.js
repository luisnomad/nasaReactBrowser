const setCriteria = (criteria = '') => {

    return {
        type: 'SET_CRITERIA',
        payload: criteria
    }
};

export default setCriteria;