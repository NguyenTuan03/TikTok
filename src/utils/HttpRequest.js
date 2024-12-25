import axios from "axios";

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
    
})
export const get = async (url, option={}) => {
    const res = await httpRequest.get(url,option);
    return res.data
}
export const post = async (url,data={}, option={}) => {
    const res = await httpRequest.post(url,data,option);
    return res.data
}
export const put = async (url,data={}, option={}) => {
    const res = await httpRequest.put(url,data,option);
    return res.data
}
export const remove = async (url, option={}) => {
    const res = await httpRequest.delete(url,option);
    return res.data
}
export default httpRequest;