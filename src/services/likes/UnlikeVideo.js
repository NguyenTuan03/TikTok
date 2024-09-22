import { post } from "../../utils/HttpRequest";
export const UnlikeApost = async (id, token) => {
    try {
        const res = await post(
            `videos/${id}/unlike`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
