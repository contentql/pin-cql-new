import axios, { AxiosInstance } from 'axios'

// Creating an Axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.vercel.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer aYXFXA5dLm3PwRsxik081ANy',
    // Add other custom default headers here
  },
})

export default axiosInstance
