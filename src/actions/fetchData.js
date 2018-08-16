import axios from 'axios';

import { FETCH_DATA_START, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from './types';

const fetchDataStart = () => ({
  type: FETCH_DATA_START
});

const fetchDataSuccess = data => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

const fetchDataFail = error => ({
  type: FETCH_DATA_FAIL,
  error
});

/*
 * The NASA Api returns URLs for next/previous pages, so the pagination
 * links will call this action using that URL. If the url param is empty,
 * the base URL will be assumed, using the current criteria.
 */
export const fetchData = (criteria = '', url = '') => dispatch => {
  dispatch(fetchDataStart());

  const ENDPOINT = `https://images-api.nasa.gov/search?q=${criteria}&media_type=image,video`;
  const request = axios.get(url !== '' ? url : ENDPOINT);

  return request
    .then(res => {
      dispatch(fetchDataSuccess(res.data));
      return res;
    })
    .catch(error => {
      dispatch(fetchDataFail(error.message));
      return error;
    });
};

export default fetchData;
