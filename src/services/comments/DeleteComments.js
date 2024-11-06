import { remove } from "../../utils/HttpRequest";

export const deleteComment = async (idComment, token) => {
    try {
        const res = await remove(`comments/${idComment}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return res;
    } catch (e) {
        return { Error: e.response.status };
    }
};