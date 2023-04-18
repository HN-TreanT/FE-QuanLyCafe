import removeAccents from "./RemoveAccent";

interface SearchValue {
  searchValue: string;
  categories: any;
}
const SearchCategory = (search: SearchValue) => {
  const { searchValue, categories } = search;
  let filterOrders: any[] = [];
  filterOrders = categories.filter((category: any) => {
    const CategoryName = removeAccents(
      category.nameCategory
    ).toLocaleLowerCase();
    const searchValueConvert = removeAccents(searchValue).toLocaleLowerCase();
    return CategoryName.includes(searchValueConvert);
  });
  return filterOrders;
};
export const CategorySupport = {
  SearchCategory,
};
