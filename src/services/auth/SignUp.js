import httpRequest from "../../utils/HttpRequest";
export const Register = async (type, email, password) => {
    try {
        const res = await httpRequest.post("auth/register", {
            type,
            email,
            password,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
