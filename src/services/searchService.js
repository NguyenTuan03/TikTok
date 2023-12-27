import * as HttpRequest from '../utils/HttpRequest.js';
export const search = async (q,type='less') => {
    try {
        const res = await HttpRequest.get('users/search', {
            params: {
                q,
                type
            }
        })  
        return res.data
    } catch (error) {
        console.error("Error fetching",error);
    }
}
