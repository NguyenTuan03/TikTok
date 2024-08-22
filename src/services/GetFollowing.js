import httpRequest from "./../utils/HttpRequest";
export const getFollowing = async () => {
    try {
        const res = await httpRequest.post("auth/login", {},{
            params: {

            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
