import { post } from "../../utils/HttpRequest";
export const unfollowUserAPI = async (id, token) => {
    try {
        const res = await post(
            `users/${id}/unfollow`,
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
