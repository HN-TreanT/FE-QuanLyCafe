import createApiServices from "../createApiService";
const api = createApiServices();
const getAllCustomer = (page: Number, name: string) => {
  let url;
  if (name) {
    url = `/api/Customer/getAllCustomer?page=1&name=${name}`;
  } else {
    url = `/api/Customer/getAllCustomer?page=${page}`;
  }
  return api.makeAuthRequest({
    url: url,
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
const searchCustomerByName = (page: Number, name: string) => {
  console.log(page, name);
  let url;
  if (name) {
    url = `/api/Customer/searchByName/?CustomerName=${name}&page=${page}`;
  } else {
    url = `/api/Customer/searchByName/?CustomerName=${name}`;
  }
  return api.makeAuthRequest({
    url: url,
    method: "GET",
  });
};

export const customerServices = {
  getAllCustomer,
  getCustomerDetail,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomerByName,
};
