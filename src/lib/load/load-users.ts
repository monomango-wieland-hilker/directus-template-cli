import { api } from "../api";
import generator from "generate-password";

export default async (
  users: any[],
  legacyAdminRoleID: string,
  newAdminRoleId: string
) => {
  const cleanedUpUsers = users.map((user) => {
    delete user.last_page;
    delete user.token;
    // user.password = getNewPassword()

    if (user.role === legacyAdminRoleID) {
      user.role = newAdminRoleId;
    }

    return user;
  });
  for (const user of cleanedUpUsers) {
    try {
      await api.post("users", user);
      // console.log('Uploaded User' + user.email)
    } catch (error) {
      console.log("Error uploading user.", error.response.data.errors);
      console.log("error user", user);
    }
  }
};

const getNewPassword = () => {
  return generator.generate({
    length: 12,
    numbers: true,
  });
};
