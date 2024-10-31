import httpRequest from "../../utils/HttpRequest";
export const getAVideo = async (uuid, token) => {
    try {
        const res = await httpRequest.get(`videos/${uuid}`, {
            headers: {
                Authorization:'Bearer ' + token
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
