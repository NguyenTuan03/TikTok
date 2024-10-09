import { get } from '../../utils/HttpRequest';
export const getAnUser = async (nickname) => {
    try {
        const res = await get(`users/${nickname}`)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}