import axios, { AxiosInstance } from "axios";
import { tokenService } from "./token.services";

const Axios: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/v1",
});

Axios.interceptors.request.use(
  (request) => {
    const token = tokenService.checkToken();
    if (token) {
      console.log("token exist");
      request.headers.Authorization = "Bearer " + tokenService.getToken();
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
