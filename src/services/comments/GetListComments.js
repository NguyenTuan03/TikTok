import { get } from "../../utils/HttpRequest";

export const getListComments = async (id,token) => {
    try {
        const res  = await get(`videos/${id}/comments`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return res.data
    } catch (error) {   
        console.log(error);
        
    }
}