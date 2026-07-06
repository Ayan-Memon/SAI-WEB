import api from "./axios.instance";

export const getCurrentUser = async () => {
    const res = await api.get("/user/profile");
    return res.data.user;
};
