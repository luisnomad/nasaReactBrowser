import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAIL,
  FETCH_ASSET_SUCCESS,
  FETCH_ASSET_FAIL,
  FETCH_NASAPOTD_SUCCESS,
  FETCH_NASAPOTD_FAIL,
  CLEAR_ASSET
} from '../actions/types';

const nasaApi = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return Object.assign({}, state, { error: null }, action.payload);
    case FETCH_DATA_FAIL:
      return Object.assign({}, state, { error: action.error });
    case FETCH_ASSET_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        assetContent: action.payload
      });
    case FETCH_ASSET_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        assetContent: null
      });
    case FETCH_NASAPOTD_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        NasaPictureOfTheDay: action.payload
      });
    case FETCH_NASAPOTD_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        NasaPictureOfTheDay: null
      });
    case CLEAR_ASSET:
      return Object.assign({}, state, {
        error: null,
        assetContent: null
      });
    default:
      return state;
  }
};

export default nasaApi;
