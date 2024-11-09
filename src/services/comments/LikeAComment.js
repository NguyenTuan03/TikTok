import { post } from "../../utils/HttpRequest";

export const likeAComment = async (id, token) => {
    try {
        const res = await post(
            `comments/${id}/like`,
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
