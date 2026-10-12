
import TopBar from "./components/TopBar";
import DisplayArea from "./components/DisplayArea";

import "./App.css";

import Home from "./pages/home";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Admin from "./components/admin";
import AddBooks from "./pages/addBooks";
import EditBooks from "./pages/EditBooks";
import Purchases from "./pages/purchase";
import MyOrders from "./pages/orders";
import User from "./components/user";
import SearchBooks from "./pages/SearchBooks";
import { useDispatch } from "react-redux";
import {useEffect } from "react";
import { sessionRequest } from "./redux/users/usersaction";

import { Provider } from "react-redux";
import store from "./redux/store";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PurchaseDetails from "./pages/PurchaseDetails";
import OrderDetails from "./pages/OrderDetails"



function AppContent() {

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("APP CONTENT LOADED");
    dispatch(sessionRequest());
  }, [dispatch]);

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Home />
            
            </>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/user"
          element={<User />}
        />

        <Route
          path="/admin/addBooks"
          element={<AddBooks />}
        />

        <Route
          path="/admin/EditBooks/:id"
          element={<EditBooks />}
        />

        <Route
          path="/admin/searchBooks"
          element={<SearchBooks />}
        />
         <Route
          path="/admin/Purchases"
          element={<Purchases/>}
        />
         <Route
          path="/user/Order"
          element={<MyOrders/>}
        />
        <Route
          path="/admin/purchase/:user_id/:order_id"
          element={<PurchaseDetails/>}
        />
         <Route
          path="/user/order/:order_id"
          element={<OrderDetails/>}
        />

      </Routes>

    </BrowserRouter>
  );
}


function App() {

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}


export default App;

