import createApiServices from "../createApiService";
const api = createApiServices();
const getAllWorkshift = () => {
  return api.makeAuthRequest({
    url: "/api/WorkShift/GetWorkShift",
    method: "GET",
  });
};
export const workshiftService = {
  getAllWorkshift,
};
