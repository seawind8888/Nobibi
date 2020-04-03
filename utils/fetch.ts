import axios, { AxiosResponse, AxiosPromise }  from 'axios';
import { message } from 'antd';
const instance = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3001',
  withCredentials: true,
  // timeout: 1000
});

export default function fetch(options) {
  if (options.useToken) {
    options.headers = {
      Authorization: 'Bearer ' + window.localStorage.getItem('Token'),
    };
  }

  return instance(options)
    .then(response => {
      const { data } = response;
      const { status } = data;
      const success = status === 200 ? true : false;
      if (!success && typeof window !== 'undefined') {
        message.error(data.message);
      }
      if (status === 401) {
        window.localStorage.removeItem('Token');
        window.localStorage.removeItem('userName');
      }
      return Promise.resolve({
        success: success,
        ...data,
      });
    })
    .catch(error => {
      if (typeof window !== 'undefined') {
        message.info(error || 'Network Error');
      }
      return Promise.reject();
    });
}
