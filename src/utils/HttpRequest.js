import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // timeout:1000,
})
export const get = async (url, options = {}) => {
    const res = await httpRequest.get(url,options);
    return res.data
}
export default httpRequest