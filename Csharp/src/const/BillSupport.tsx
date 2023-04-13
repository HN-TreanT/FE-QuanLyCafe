import removeAccents from "./RemoveAccent";

interface SearchValue {
  selectedTypeSearch: string;
  searchValue: string;
  orders: any;
}
const SearchBill = (search: SearchValue) => {
  const { selectedTypeSearch, searchValue, orders } = search;
  let filterOrders: any[] = [];
  if (selectedTypeSearch === "tableFood") {
    const searchValueAsNumber = Number(searchValue);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filterOrders = orders.filter((order: any) => {
      return order.table === searchValueAsNumber;
    });
  }
  if (selectedTypeSearch === "nameCustomer") {
    filterOrders = orders.filter((order: any) => {
      const CustomerName = removeAccents(order.customer).toLocaleLowerCase();
      const searchValueConvert = removeAccents(searchValue).toLocaleLowerCase();
      return CustomerName.includes(searchValueConvert);
    });
  }
  if (selectedTypeSearch === "phonenumber") {
    console.log("check --->");
    filterOrders = orders.filter((order: any) => {
      return order.phonenumber === searchValue;
    });
  }
  console.log(selectedTypeSearch);
  return filterOrders;
};
export const BillSupport = {
  SearchBill,
};
