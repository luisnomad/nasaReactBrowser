import { FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from '../actions/types';

const nasaApi = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return Object.assign({}, ...state, { error: null }, action.payload);
    case FETCH_DATA_FAIL:
      return Object.assign({}, ...state, { error: action.error });
    default:
      return state;
  }
};

export default nasaApi;
