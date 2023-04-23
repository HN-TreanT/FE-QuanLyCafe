import createApiServices from "../createApiService";
const api = createApiServices();
const getAllWorkshift = () => {
  return api.makeAuthRequest({
    url: "/api/WorkShift/GetWorkShift",
    method: "GET",
  });
};

const getWorkshiftDetail = (Id: any) => {
  return api.makeAuthRequest({
    url: `/api/WorkShift/GetWorkShiftDetail/${Id}`,
    method: "GET",
  });
};
const deleteWorkShift = (Id: any) => {
  return api.makeAuthRequest({
    url: `/api/WorkShift/DeleteWS/${Id}`,
    method: "DELETE",
  });
};
const createWorkShift = (data: any) => {
  return api.makeAuthRequest({
    url: `/api/WorkShift/CreateWorkShift`,
    method: "POST",
    data: data,
  });
};
const updateWorkShift = (Id: Number, data: any) => {
  return api.makeAuthRequest({
    url: `/api/WorkShift/UpdateWorkShift/${Id}`,
    method: "PUT",
    data,
  });
};
export const workshiftService = {
  getAllWorkshift,
  getWorkshiftDetail,
  deleteWorkShift,
  createWorkShift,
  updateWorkShift,
};
