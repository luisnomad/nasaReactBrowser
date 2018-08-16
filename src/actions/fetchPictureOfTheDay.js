import axios from 'axios';

import {
  FETCH_NASAPOTD_START,
  FETCH_NASAPOTD_SUCCESS,
  FETCH_NASAPOTD_FAIL
} from './types';

const fetchNasaPOTDStart = () => ({
  type: FETCH_NASAPOTD_START
});

const fetchNasaPOTDSuccess = data => ({
  type: FETCH_NASAPOTD_SUCCESS,
  payload: data
});

const fetchNasaPOTDFail = error => ({
  type: FETCH_NASAPOTD_FAIL,
  error
});

export const fetchNasaPOTD = () => dispatch => {
  dispatch(fetchNasaPOTDStart());

  const myNasaApiKey = 'roB3kQC3jgyKFB1vXD5Xz2mJgz88k3Yo0wPMbowx';
  const URL = `https://api.nasa.gov/planetary/apod?api_key=${myNasaApiKey}`;
  const request = axios.get(URL);

  return request
    .then(res => {
      dispatch(fetchNasaPOTDSuccess(res.data));
      return res;
    })
    .catch(error => {
      dispatch(fetchNasaPOTDFail(error.message));
      return error;
    });
};

export default fetchNasaPOTD;
