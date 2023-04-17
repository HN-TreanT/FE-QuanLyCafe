import removeAccents from "./RemoveAccent";

interface SearchValue {
  selectedTypeSearch: string;
  searchValue: string;
  products: any;
}
const SearchProduct = (search: SearchValue) => {
  const { selectedTypeSearch, searchValue, products } = search;
  let filterOrders: any[] = [];
  if (selectedTypeSearch === "nameProduct") {
    filterOrders = products.filter((product: any) => {
      const CustomerName = removeAccents(
        product.productName
      ).toLocaleLowerCase();
      const searchValueConvert = removeAccents(searchValue).toLocaleLowerCase();
      return CustomerName.includes(searchValueConvert);
    });
  }
  if (selectedTypeSearch === "category") {
    filterOrders = products.filter((product: any) => {
      const nameCategory = removeAccents(product.category).toLocaleLowerCase();
      const searchValueConvert = removeAccents(searchValue).toLocaleLowerCase();
      return nameCategory.includes(searchValueConvert);
    });
  }
  return filterOrders;
};
export const ProductSupport = {
  SearchProduct,
};
