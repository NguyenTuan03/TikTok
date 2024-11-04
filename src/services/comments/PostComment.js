import { post } from "../../utils/HttpRequest";

export const postComment = async (comment, uuid, token) => {
    try {
        const res = await post(
            `videos/${uuid}/comments`,
            {
                comment,
            },
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
