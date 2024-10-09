import { get } from "../../utils/HttpRequest";
export const getUserVideos = async (id) => {
    try {
        const res = await get(`users/${id}/posts`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
