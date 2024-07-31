
import httpRequest from './../utils/HttpRequest';
export const search = async (q,type) => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type
            }
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}