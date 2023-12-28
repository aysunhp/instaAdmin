import AddUser from "../pages/AddUser";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import AdminRoot from "../components/AdminRoot";
import Notification from "../pages/Notification";

const router = [
  {
    path: "/",
    element: <AdminRoot />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:id",
        element: <Detail />,
      },
      {
        path: "/addUser",
        element: <AddUser />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
    ],
  },
];

export default router;
