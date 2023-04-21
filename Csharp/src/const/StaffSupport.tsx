import removeAccents from "./RemoveAccent";

interface SearchValue {
  searchValue: any;
  staffs: any;
}
const SearchStaff = (search: SearchValue) => {
  const { searchValue, staffs } = search;
  let filterStaffs: any[] = [];

  filterStaffs = staffs.filter((staff: any) => {
    const staffName = removeAccents(staff?.nameStaff).toLocaleLowerCase();
    const searchValueConvert = removeAccents(searchValue).toLocaleLowerCase();
    return staffName.includes(searchValueConvert);
  });
  return filterStaffs;
};
export const StaffSupport = {
  SearchStaff,
};
