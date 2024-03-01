import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const instance: import('axios').AxiosInstance = axios.create({
  baseURL: baseURL,
});

export default instance;