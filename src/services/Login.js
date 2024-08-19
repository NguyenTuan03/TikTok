import httpRequest from "./../utils/HttpRequest";
export const login = async (email, password) => {
    try {
        const res = await httpRequest.post("auth/login", {
            email,
            password,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
