
export const SET_CRITERIA = 'SET_CRITERIA';

const setCriteria = (criteria = '') => {

    return {
        type: SET_CRITERIA,
        payload: criteria
    }
};

export default setCriteria;