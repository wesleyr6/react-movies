import axios from 'axios';
import { REACT_APP_API_URL, REACT_APP_API_KEY } from '../config/variables';

export const API = REACT_APP_API_URL;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const APIResquest = async (config) => {
  const requestURI = `${REACT_APP_API_URL}/${config.uri}`;

  const requestConfig = () => {
    const settings = {
      method: config.method,
      headers: {
        ...headers,
        ...config.headers || null,
      },
      params: {
        ...config.params,
        api_key: REACT_APP_API_KEY,
      },
    };

    if (config.method === 'POST' || config.method === 'PUT') {
      settings.data = JSON.stringify(config.data || {});
    }

    return settings;
  };

  const promiseResquestAPI = async () => {
    try {
      const { data } = await axios(requestURI, requestConfig());
      return data;
    } catch (err) {
      const errorMessage = 'Something went wrong.';

      if (err.response.data && err.response.data.status_message) {
        throw err.response.data.status_message;
      }

      throw errorMessage;
    }
  };

  return promiseResquestAPI();
};

export default { API, APIResquest };
