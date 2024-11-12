import httpRequest from '../../utils/HttpRequest';
export const search = async (q,type,page) => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type,
                page
            }
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}