import { post } from "../../utils/HttpRequest";
export const createAVideo = async (
    description,
    upload_file,
    thumbnail_time = 0,
    music = "",
    viewable = "",
    allow = [],
    token
) => {
    const formData = new FormData();
    try {        
        formData.append("description", description);
        formData.append("upload_file", upload_file); 
        formData.append("thumbnail_time", thumbnail_time);
        formData.append("music", music);
        formData.append("viewable", viewable);
        
        allow.forEach((item) => {
            formData.append("allows[]", item);
        });
        
        const res = await post(`videos`, formData, {
            headers: {
                Authorization: "Bearer " + token,                
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        console.log([...formData.entries()]);
        console.error("Error in createAVideo:", error.response || error);
    }
};