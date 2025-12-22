import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://p11-blood-backend.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
