import createApiServices from "../createApiService";
const api = createApiServices();
const getAllStaff = (selectedPage: Number, searchValue: string) => {
  if (!selectedPage) {
    selectedPage = 1;
  }
  if (!searchValue) {
    searchValue = "";
  }
  return api.makeAuthRequest({
    url: `/api/staff/GetAllStaff?page=${selectedPage}&name=${searchValue}`,
    method: "GET",
  });
};
const getStaffByEmail = (email: any) => {
  return api.makeAuthRequest({
    url: `/api/staff/searchStaffByEmail?email=${email}`,
    method: "GET",
  });
};
const getStaffByPhone = (PhoneNumber: any) => {
  return api.makeAuthRequest({
    url: `/api/staff/searchStaffByPhone/${PhoneNumber}`,
    method: "GET",
  });
};
const getStaffById = (Id: any) => {
  return api.makeAuthRequest({
    url: `/api/staff/getStaff/${Id}`,
    method: "GET",
  });
};
const updateStaff = (Id: any, data: any) => {
  return api.makeAuthRequest({
    url: `/api/staff/UpdateInfoStaff/${Id}`,
    method: "PUT",
    data,
  });
};
const createStaff = (data: any) => {
  return api.makeAuthRequest({
    url: `/api/staff/CreateStaff`,
    method: "POST",
    data,
  });
};
const deleteStaff = (Id: any) => {
  return api.makeAuthRequest({
    url: `/api/staff/DeleteStaff/${Id}`,
    method: "DELETE",
  });
};
const uploadAvartarImage = (data: any) => {
  return api.makeAuthRequest({
    url: `/api/staff/UploadAvartarStaff`,
    method: "POST",
    data,
  });
};
export const staffService = {
  getAllStaff,
  getStaffById,
  updateStaff,
  createStaff,
  deleteStaff,
  uploadAvartarImage,
  getStaffByEmail,
  getStaffByPhone,
};
