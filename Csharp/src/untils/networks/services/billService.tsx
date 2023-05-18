import createApiServices from "../createApiService";
const api = createApiServices();

const getAllOrder = (
  typeSearch: string,
  searchValue: any,
  selectedStateBill: string,
  page: Number,
  timeStart: any,
  timeEnd: any
) => {
  let url;
  if (searchValue) {
    if (typeSearch === undefined || typeSearch === "nameCustomer") {
      typeSearch = "nameCustomer";
      url = `/api/Order/${selectedStateBill}?page=${page}&typeSearch=${typeSearch}&searchValue=${searchValue}&timeStart=${timeStart}&timeEnd=${timeEnd}`;
    }
    url = `/api/Order/${selectedStateBill}?page=${page}&typeSearch=${typeSearch}&searchValue=${searchValue}&timeStart=${timeStart}&timeEnd=${timeEnd}`;
  } else {
    url = `/api/Order/${selectedStateBill}?page=${page}&timeStart=${timeStart}&timeEnd=${timeEnd}`;
  }
  return api.makeAuthRequest({
    url: url,
    method: "GET",
  });
};
const getDetailOrder = (IdOrder: any) => {
  return api.makeAuthRequest({
    url: `/api/Order/getOrderById/${IdOrder}`,
    method: "GET",
  });
};

const deleteOrder = (IdOrder: any) => {
  return api.makeAuthRequest({
    url: `/api/Order/deleteOrder/${IdOrder}`,
    method: "DELETE",
  });
};

const createOrder = (data: any) => {
  return api.makeAuthRequest({
    url: `/api/Order/creatOrder`,
    method: "POST",
    data,
  });
};
const updateOrder = (IdOrder: string, data: any) => {
  return api.makeAuthRequest({
    url: `/api/Order/updateOrder/${IdOrder}`,
    method: "PUT",
    data,
  });
};

const graftOrder = (IdOldOrder: any, IdNewOrder: any) => {
  return api.makeAuthRequest({
    url: `/api/Order/graftOrder?IdOldOrder=${IdOldOrder}&IdNewOrder=${IdNewOrder}`,
    method: "POST",
  });
};
const splitOrder = (IdOldOrder: any, IdNewOrder: any, data: any) => {
  return api.makeAuthRequest({
    url: `/api/Order/splitOrder?IdOldOrder=${IdOldOrder}&IdNewOrder=${IdNewOrder}`,
    method: "POST",
    data,
  });
};

export const billServices = {
  getAllOrder,
  deleteOrder,
  getDetailOrder,
  createOrder,
  updateOrder,
  graftOrder,
  splitOrder,
};
