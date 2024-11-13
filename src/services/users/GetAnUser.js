import { get } from '../../utils/HttpRequest';
export const getAnUser = async (nickname,token) => {
    try {
        const res = await get(`users/${nickname}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}