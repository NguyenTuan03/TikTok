import httpRequest from "./../utils/HttpRequest";
export const getFollowing = async (token) => {
    try {
        const res = await httpRequest.get(
            "me/followings",
            {
                params: {
                    page: 1,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
