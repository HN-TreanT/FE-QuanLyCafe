import createApiServices from "../createApiService";
const api = createApiServices();
const handleLoginApi = (loginInfo: any) => {
  return api.makeRequest({
    url: "/api/authorization/Login",
    method: "POST",
    data: loginInfo,
  });
};

const handleRegister = (regisInfo: any) => {
  return api.makeRequest({
    url: "/api/Authorization/Registration",
    method: "POST",
    data: regisInfo,
  });
};

const handleRevoke = () => {
  return api.makeAuthRequest({
    url: "/api/Token/Revoke",
    method: "POST",
  });
};

const handleRefreshToken = (data: any) => {
  return api.makeRequest({
    url: "/api/Token/Refresh",
    method: "POST",
    data,
  });
};
export const authService = {
  handleLoginApi,
  handleRegister,
  handleRevoke,
  handleRefreshToken,
};
