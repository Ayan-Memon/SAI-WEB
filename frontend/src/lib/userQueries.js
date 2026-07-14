import api from "./axios.instance";

export const getCurrentUser = async () => {
  const res = await api.get("/user/profile");
  return res.data.user;
};

export const getUsers = async ({ pageParam, selectedRole, search }) => {
  const res = await api.get("/user/get-users", {
    params: {
      cursor: pageParam,
      limit: 10,
      role: selectedRole,
      search,
    },
  });
  return res.data;
};

export const updateUserRoles = async (data) => {
  console.log(data);
  const res = await api.patch("/user/update-role", { users: data });
  return res.data;
};
