import { post } from "../../utils/HttpRequest";
export const followUserAPI = async (id, token) => {
    try {
        const res = await post(
            `users/${id}/follow`,
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
