import { post } from "../../utils/HttpRequest";
export const LikeApost = async (id, token) => {
    try {
        const res = await post(
            `videos/${id}/like`,
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
