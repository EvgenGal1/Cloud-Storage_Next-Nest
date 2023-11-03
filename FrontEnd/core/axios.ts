// настр.axios с сохр.Токен. Использ.на Front/Back
import axios from 'axios';
import { parseCookies } from 'nookies';

axios.defaults.baseURL = 'http://localhost:7531';

// при req > БД проверка Токен у user
axios.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const { _token } = parseCookies();

    config.headers.Authorization = 'Bearer ' + _token;
  }

  return config;
});

export default axios;
