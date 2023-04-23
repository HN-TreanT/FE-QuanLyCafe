import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { store, persistor } from "./redux";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { RouterLinks } from "./const";
import Login from "./pages/login-page/login";
import { AuthorizationComponent } from "./components/authorization/AuthorizationComponent";
import HomePage from "./pages/Home-Page/HomePage";
import OverviewPage from "./pages/Home-Page/Center/OverviewPage/OverviewPage";
import UserPage from "./pages/Home-Page/Center/user_page/UserPage";
import RegisterPage from "./pages/register-page/Register";
import OrderPage from "./pages/Order-page/OrderPage";
import BillPage from "./pages/Home-Page/Center/bill-page/BillPage";
import ProductList from "./pages/Home-Page/Center/product-list/ProductList";
import CategoryPage from "./pages/Home-Page/Center/category-page/CategoryPage";
import StaffPage from "./pages/Home-Page/Center/Staff-page/StaffPage";
import CustomerPage from "./pages/Home-Page/Center/customer-page/CustomerPage";
import TablePage from "./pages/Home-Page/Center/table-page/TablePage";
import ListWarehouse from "./pages/Home-Page/Center/list-warehouse/ListWarehouse";
import ImportWarehouse from "./pages/Home-Page/Center/import-warehouse/ImportWarehouse";
import ExportWarehouse from "./pages/Home-Page/Center/export-warehouse/ExportWarehouse";
import HistoryWarehouse from "./pages/Home-Page/Center/history-warehouse/HistoryWarehouse";
import AddProductPage from "./pages/Home-Page/Center/product-list/AddProduct-page/AddProductPage";
import UpdateProductPage from "./pages/Home-Page/Center/product-list/UpdateProduct-page/UpdateProductPage";
import DetailCategory from "./pages/Home-Page/Center/category-page/DetailCategory/DetaileCategory";
import AddStaffPage from "./pages/Home-Page/Center/Staff-page/AddStaffPage/AddStaffPage";
import DetailStaffPage from "./pages/Home-Page/Center/Staff-page/DetailStaffPage/DetailStaffPage";
import WorkShiftPage from "./pages/Home-Page/Center/workshift-page/WorkShiftPage";
import DetailWorkShift from "./pages/Home-Page/Center/workshift-page/DetailWorkShift/DetailWorkShift";

function App() {
  return (
    <>
      <ReactNotifications />
      <Provider store={store}>
        <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
            <div className="MainApp">
              <div className="MainContent">
                <div className="ContentPage">
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to={RouterLinks.LOGIN_PAGE} />}
                    />
                    <Route path={RouterLinks.LOGIN_PAGE} element={<Login />} />
                    <Route
                      path={RouterLinks.SIGN_UP}
                      element={<RegisterPage />}
                    />
                    <Route
                      path={RouterLinks.HOME_PAGE}
                      element={
                        <AuthorizationComponent element={<HomePage />} />
                      }
                    >
                      <Route
                        path={RouterLinks.OVERVIEW_PAGE}
                        element={
                          <AuthorizationComponent element={<OverviewPage />} />
                        }
                      />
                      <Route
                        path={RouterLinks.REPORT_REVENUE_PAGE}
                        element={
                          <AuthorizationComponent element={<UserPage />} />
                        }
                      />
                      <Route
                        path={RouterLinks.BILL_PAGE}
                        element={
                          <AuthorizationComponent element={<BillPage />} />
                        }
                      />
                      <Route
                        path={RouterLinks.PRODUCTS_PAGE}
                        element={
                          <AuthorizationComponent element={<ProductList />} />
                        }
                      />
                      <Route
                        path={RouterLinks.CATEGORY_PAGE}
                        element={
                          <AuthorizationComponent element={<CategoryPage />} />
                        }
                      />
                      <Route
                        path={RouterLinks.STAFF_PAGE}
                        element={
                          <AuthorizationComponent element={<StaffPage />} />
                        }
                      />
                      <Route
                        path={RouterLinks.CUTOMER_PAGE}
                        element={
                          <AuthorizationComponent element={<CustomerPage />} />
                        }
                      />
                      <Route
                        path={RouterLinks.TABLE_PAGE}
                        element={
                          <AuthorizationComponent element={<TablePage />} />
                        }
                      />
                      <Route
                        path={RouterLinks.LIST_WAREHOUSE}
                        element={
                          <AuthorizationComponent element={<ListWarehouse />} />
                        }
                      />
                      <Route
                        path={RouterLinks.IMPORT_WAREHOUSE}
                        element={
                          <AuthorizationComponent
                            element={<ImportWarehouse />}
                          />
                        }
                      />
                      <Route
                        path={RouterLinks.EXPORT_WAREHOUSE}
                        element={
                          <AuthorizationComponent
                            element={<ExportWarehouse />}
                          />
                        }
                      />
                      <Route
                        path={RouterLinks.HISTORY_WAREHOUSE}
                        element={
                          <AuthorizationComponent
                            element={<HistoryWarehouse />}
                          />
                        }
                      />
                      <Route
                        path={RouterLinks.ADD_PRODUCT_PAGE}
                        element={
                          <AuthorizationComponent
                            element={<AddProductPage />}
                          />
                        }
                      />
                      <Route
                        path={RouterLinks.UPDATE_PRODUCT_PAGE}
                        element={
                          <AuthorizationComponent
                            element={<UpdateProductPage />}
                          />
                        }
                      />
                      <Route
                        path={RouterLinks.DETAIL_CATEGORY}
                        element={
                          <AuthorizationComponent
                            element={<DetailCategory />}
                          />
                        }
                      />
                      <Route
                        path={RouterLinks.ADD_STAFF_PAGE}
                        element={
                          <AuthorizationComponent element={<AddStaffPage />} />
                        }
                      />
                      <Route
                        path={RouterLinks.DETAIL_STAFF_PAGE}
                        element={
                          <AuthorizationComponent
                            element={<DetailStaffPage />}
                          />
                        }
                      />
                      <Route
                        path={RouterLinks.WORKSHIFT_PAGE}
                        element={
                          <AuthorizationComponent element={<WorkShiftPage />} />
                        }
                      />
                      <Route
                        path={RouterLinks.DETAIL_WORK_SHIFT}
                        element={
                          <AuthorizationComponent
                            element={<DetailWorkShift />}
                          />
                        }
                      />
                    </Route>

                    <Route
                      path={RouterLinks.ORDER_PAGE}
                      element={
                        <AuthorizationComponent element={<OrderPage />} />
                      }
                    ></Route>
                  </Routes>
                </div>
              </div>
            </div>
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
