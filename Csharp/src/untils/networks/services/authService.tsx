import createApiServices from "../createApiService";
const api = createApiServices();
// const handleLoginApi = (loginInfo: any) => {
//   return api.makeRequest({
//     url: "/api/v1/auth/login",
//     method: "POST",
//     data: loginInfo,
//   });
// };
const handleLoginApi = (loginInfo: any) => {
  return api.makeRequest({
    url: "/api/Account/login",
    method: "POST",
    data: loginInfo,
  });
};

const handleRegister = (regisInfo: any) => {
  return api.makeRequest({
    url: "/api/Account/register",
    method: "POST",
    data: regisInfo,
  });
};

export const authService = {
  handleLoginApi,
  handleRegister,
};
