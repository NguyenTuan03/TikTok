import { post } from "../../utils/HttpRequest";

export const unlikeAComment = async (id, token) => {
    try {
        const res = await post(
            `comments/${id}/unlike`,
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};