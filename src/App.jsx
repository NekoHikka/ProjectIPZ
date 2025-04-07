import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Error,
  // Favorite,
  // HistoryOrders,
  HomeLayout,
  Login,
  Menu,
  // Messages,
  Orders,
  Register,
  Restorants,
  Landing,
  ResetPassword,
  SingleOrder,
} from "./pages";

import { ErrorElement } from "./components";

// import { loader as landingLoader } from "./pages/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        // loader: landingLoader,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:id",
        element: <SingleOrder />,
      },

      {
        path: "restorants",
        element: <Restorants />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
    errorElement: <Error />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
