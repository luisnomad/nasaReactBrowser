import axios from 'axios';

import {
  FETCH_ASSET_START,
  FETCH_ASSET_SUCCESS,
  FETCH_ASSET_FAIL,
  CLEAR_ASSET
} from './types';

const fetchAssetStart = () => ({
  type: FETCH_ASSET_START
});

const fetchAssetSuccess = data => ({
  type: FETCH_ASSET_SUCCESS,
  payload: data
});

const fetchAssetFail = error => ({
  type: FETCH_ASSET_FAIL,
  error
});

export const clearAsset = () => ({
  type: CLEAR_ASSET
});

const fetchAsset = (nasaId, mediaType = 'image') => dispatch => {
  dispatch(fetchAssetStart());

  const URL = `https://images-api.nasa.gov/asset/${nasaId}`;
  const request = axios.get(URL);

  return request
    .then(res => {
      dispatch(fetchAssetSuccess(transformAssetData(res.data, mediaType)));
      return res;
    })
    .catch(error => {
      dispatch(fetchAssetFail(error.message));
      return error;
    });
};

/*
 * internal
 */
const transformAssetData = (data, mediaType) => {
  const { collection } = data;
  const parsedData = collection.items
    .map(item => {
      return item.href;
    })
    .reduce((output, item) => {
      if (item.indexOf('metadata.json') > 0) {
        output.meta = item;
      } else {
        output.media = output.media || [];
        output.media.push(item);

        if (mediaType === 'image') {
          if (item.indexOf('~medium.') > 0) {
            output.mobile = item;
          } else if (item.indexOf('~small.') > 0) {
            output.mobile = item;
          }
        } else {
          if (item.indexOf('~mobile.') > 0) {
            output.mobile = item;
          }
        }

        if (item.indexOf('~orig.') > 0) {
          output.desktop = item;
        }

        if (item.indexOf('.srt') > 0) {
          output.subtitle = item;
        }

        if (!output.videoPoster && item.indexOf('preview_thumb') > 0) {
          output.videoPoster = item;
        }
      }
      return output;
    }, {});

  if (parsedData.meta) {
    return axios.get(parsedData.meta).then(metaData => {
      // Group data by type
      const groupMetaData = Object.keys(metaData.data).reduce(
        (output, item) => {
          const value = metaData.data[item];
          if (value !== '') {
            const keys = item.split(':');
            const currentGroup = keys.length > 1 ? keys[0] : 'Other';
            const currentKey = keys.length > 1 ? keys[1] : item;
            output[currentGroup] = output[currentGroup] || {};
            output[currentGroup][currentKey] = Array.isArray(value)
              ? value.join(', ')
              : value;
          }
          return output;
        },
        {}
      );
      parsedData.meta = groupMetaData;
      return parsedData;
    });
  }
  return parsedData;
};

export default fetchAsset;
