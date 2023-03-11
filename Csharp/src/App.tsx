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
                    </Route>
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
