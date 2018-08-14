import axios from 'axios';
import { FETCH_DATA } from './types';

/*
 * The NASA Api returns URLs for next/previous pages, so the pagination
 * links will call this action using that URL. If the url param is empty,
 * the base URL will be assumed, using the current criteria.
 */
const fetchData = (criteria = '', url = '') => {
  const ENDPOINT = `https://images-api.nasa.gov/search?q=${criteria}&media_type=image,video`;
  const request = axios.get(url !== '' ? url : ENDPOINT);
  // TODO: Add error handling!
  // https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/rejected-promises.md
  return fetchNasaData(request);
};

// Testable API request
export const fetchNasaData = request => {
  return dispatch =>
    dispatch({
      type: FETCH_DATA,
      payload: request
    }).catch(error => {
      console.log(error.message);
      // TODO: Dispatch a second action in response to the error
      // dispatch(error());
    });
};

export default fetchData;
