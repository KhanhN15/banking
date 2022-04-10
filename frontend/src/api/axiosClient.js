import axios from "axios";
import { BACKEND_URL } from "../constants/config";

const axiosClient = axios.create({
  baseURL: BACKEND_URL,
});
axiosClient.interceptors.request.use((config) => { //tất cả request đều phải qua đây 
  const user = localStorage.getItem('user');
  if (user) { // nếu có đăng nhập thì thực hiện
    const { access_token } = JSON.parse(user)
    config.headers.common.Authorization = `Bearer ${access_token}`;
  }
  return config;
})

export default axiosClient;
