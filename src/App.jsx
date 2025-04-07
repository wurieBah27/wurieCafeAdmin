/*THIRD PARTIES LIBRARIES USEC */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/* APP COMPONENTS */
import Applayout from "./components/Applayout";
import Dashboard from "./pages/Dashboard";
import Single from "./ui/Single";
import Customers from "./pages/Customers";
import SingleCustomerDetails from "./pages/SingleCustomerDetails";
import { userInputs } from "./formSource";
import OrdersPage from "./pages/OrdersPage";
import EmployeesList from "./pages/EmployeesList";
import ProductsList from "./features/products/ProductsList";
import AddNewProducts from "./features/products/AddNewProducts";
import SingleProductDetails from "./features/products/SingleProductDetails";
import SingleEmployeeDetails from "./features/Employees/SingleEmployeeDetails";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import AddNewCustomer from "./features/Customers/AddNewCustomer";
import SingleOderDetail from "./features/Orders/SingleOderDetail";
import EditProducts from "./features/products/EditProducts";
import OverlayBg from "./components/OverlayBg";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import OnTransitProducts from "./pages/OnTransitProducts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutes>
                <Applayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders">
              <Route index element={<OrdersPage />} />
              <Route path="/orders/:ordersID" element={<SingleOderDetail />} />
            </Route>
            <Route path="/users">
              <Route index element={<EmployeesList />} />
              <Route path=":userID" element={<SingleEmployeeDetails />} />
              <Route
                path="new"
                element={
                  <Single
                    inputs={userInputs}
                    title="Add New Emloyee"
                    btnText="Add Employee"
                  />
                }
              />
            </Route>
            <Route path="/customers">
              <Route index element={<Customers />} />
              <Route path=":customerID" element={<SingleCustomerDetails />} />
              <Route path="new" element={<AddNewCustomer />} />
            </Route>

            <Route path="/products">
              <Route index element={<ProductsList />} />
              <Route path=":productID" element={<SingleProductDetails />} />
              <Route path="new" element={<AddNewProducts />} />
              <Route path={`edit/:productID`} element={<EditProducts />} />
            </Route>
            <Route path="/settings">
              <Route index element={<Settings />} />
            </Route>
            <Route path="/delivering">
              <Route index element={<OnTransitProducts />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/verifyEmail" element={<EmailVerifyPage />} />
        </Routes>
        <OverlayBg status={true} />
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        reverseOrder={false}
        containerStyle={{ margin: "8px", padding: "10px 20px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 10000,
            style: {
              backgroundColor: "#ff9999",
              color: "gray",
            },
          },

          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
