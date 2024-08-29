import httpRequest from "./../utils/HttpRequest";
export const getVideoList = async (page) => {
    try {
        const res = await httpRequest.get(
            "videos",
            {
                params: {
                    type:"for-you",
                    page
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
