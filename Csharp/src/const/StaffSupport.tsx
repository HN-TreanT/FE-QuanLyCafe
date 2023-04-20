import removeAccents from "./RemoveAccent";

interface SearchValue {
  selectedTypeSearch: string;
  searchValue: string;
  staffs: any;
}
const SearchStaff = (search: SearchValue) => {
  const { selectedTypeSearch, searchValue, staffs } = search;
  let filterOrders: any[] = [];
  if (selectedTypeSearch === "tableFood") {
    const searchValueAsNumber = Number(searchValue);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filterOrders = staffs.filter((order: any) => {
      return order.table === searchValueAsNumber;
    });
  }
  if (selectedTypeSearch === "nameCustomer") {
    filterOrders = staffs.filter((order: any) => {
      const CustomerName = removeAccents(order.customer).toLocaleLowerCase();
      const searchValueConvert = removeAccents(searchValue).toLocaleLowerCase();
      return CustomerName.includes(searchValueConvert);
    });
  }
  if (selectedTypeSearch === "phonenumber") {
    console.log("check --->");
    filterOrders = staffs.filter((order: any) => {
      return order.phonenumber === searchValue;
    });
  }
  console.log(selectedTypeSearch);
  return filterOrders;
};
const compareWorkShift = (workShift: any) => {
  if (workShift === "1") {
  }
  if (workShift === "2") {
  }
  if (workShift === "3") {
  }
};
export const BillSupport = {
  SearchStaff,
};
