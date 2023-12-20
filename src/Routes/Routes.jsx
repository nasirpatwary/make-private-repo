import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Pages/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Cart from "../Pages/Dashboard/Cart/Cart";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main>Hello world!</Main>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"menu",
         element:<Menu></Menu>
        },
        {
          path:"order/:category",
          element:<Order></Order>
        },
        {
          path:"login",
          element:<Login></Login>
        },
        {
          path:'signup',
          element:<SignUp></SignUp>
        },
        {
          path:'secret',
          element:<PrivateRoute><Secret></Secret></PrivateRoute> 
        },
        
      ],
    },
    {
      path:'dashboard',
      // element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      element:<Dashboard></Dashboard>,
      children:[
        // normal user routes
        {
          path:'userHome',
          element:<UserHome></UserHome>
        },
        {
          path:'cart',
          element:<Cart></Cart>
        },
        {
          path:'payment',
          element:<Payment></Payment>
        },
        {
          path:'paymentHistory',
          element:<PaymentHistory></PaymentHistory>
        },
        // admin only routes
        {
          path:'adminHome',
          // element:<AddminRoute><AdminHome></AdminHome></AddminRoute>
          element:<AdminHome></AdminHome>
        },
        {
          path:"addItems",
          // element:<AddminRoute><AddItems></AddItems></AddminRoute>
          element:<AddItems></AddItems>
        },
        {
          path:'manageItems',
          // element:<AddminRoute><ManageItems></ManageItems></AddminRoute>
          element:<ManageItems></ManageItems>
        },
        {
          path:'updateItem/:id',
          // element:<AddminRoute><UpdateItem></UpdateItem></AddminRoute>,
          element:<UpdateItem></UpdateItem>,
          loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
        },
        {
          path:'users',
          element:<AllUsers></AllUsers>
        },
      ]
    }
    
  ]);