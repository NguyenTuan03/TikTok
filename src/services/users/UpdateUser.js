import httpRequest from "../../utils/HttpRequest";

export const UpdateUser = async (
    first_name,
    last_name,     
    bio,    
    token
) => {
    try {
        const formData = new FormData();
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        // if (avatar) formData.append("avatar", avatar);        
        formData.append("bio", bio);        

        const res = await httpRequest.post(
            "/auth/me?_method=PATCH",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return res.data;
    } catch (error) {
        if (error.response) {
            console.error("Server error response:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
        throw error;
    }
};