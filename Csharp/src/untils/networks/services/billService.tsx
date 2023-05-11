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

const deleteOrder = (IdOrder: any) => {
  return api.makeAuthRequest({
    url: `/api/Order/deleteOrder/${IdOrder}`,
    method: "DELETE",
  });
};
export const billServices = { getAllOrder, deleteOrder };
