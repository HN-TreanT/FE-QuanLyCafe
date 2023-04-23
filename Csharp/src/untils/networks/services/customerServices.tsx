import createApiServices from "../createApiService";
const api = createApiServices();
const getAllCustomer = (page: Number) => {
  return api.makeAuthRequest({
    url: `/api/Customer/getAllCustomer?page=${page}`,
    method: "GET",
  });
};
const getCustomerDetail = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/Customer/getCutomerById/${Id}`,
    method: "GET",
  });
};
const createCustomer = (data: any) => {
  return api.makeAuthRequest({
    url: `/api/Customer/createCustomer`,
    method: "POST",
    data,
  });
};
const updateCustomer = (Id: string, data: any) => {
  return api.makeAuthRequest({
    url: `/api/Customer/updateCustomerDto/${Id}`,
    method: "PUT",
    data,
  });
};

const deleteCustomer = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/Customer/deleteCustomer/${Id}`,
    method: "DELETE",
  });
};

export const customerServices = {
  getAllCustomer,
  getCustomerDetail,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
