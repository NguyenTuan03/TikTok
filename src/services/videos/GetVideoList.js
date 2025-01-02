import httpRequest from "../../utils/HttpRequest";
export const getVideoList = async (type,page,token="") => {
    try {
        const res = await httpRequest.get(
            "videos",
            {
                params: {
                    type:type,
                    page
                },
                headers: {
                    Authorization: "Bearer " + token
                }
            },            
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
