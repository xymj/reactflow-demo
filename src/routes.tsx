import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// import AntdLayout from "./DemoAntdLayout";
import AntdDatePicker from "./DemoAntd";
import NotFindPage from "./DemoAntd/NotFind";
import DemoButton from "./DemoAntdButton";
const DemoPagination = lazy(() => import("./DemoAntdPagination"));
const DemoCard = lazy(() => import("./DemoAntdCard"));
const DemoTable = lazy(() => import("./DemoAntdTable"));
const DemoTable2 = lazy(() => import("./DemoAntdTable/DemoTable2"));
const BaseFlow = lazy(() => import("./DemoBase"));
const CustomFlow = lazy(() => import("./DemoCustomNode"));
const CustomEdgeFlow = lazy(() => import("./DemoCustomEdge"));
const UserList = lazy(() => import("./DemoMockServiceWorker/UserList"));

const routes = [
  {
    path: "/",
    element: <CustomFlow />,
  },
  {
    path: "/antd",
    // element: <AntdDatePicker />,
    children: [
      {
        path: "date/picker",
        element: <AntdDatePicker />,
      },
      {
        path: "button",
        element: <DemoButton />,
      },
      {
        path: "page",
        element: <DemoPagination />,
      },
      {
        path: "card",
        element: <DemoCard />,
      },
      {
        path: "table",
        element: <DemoTable />,
      },
      {
        path: "table2",
        element: <DemoTable2 />,
      },
      {
        path: "",
        element: <AntdDatePicker />,
      },
    ],
  },
  {
    path: "/flow",
    // element: <BaseFlow />,
    children: [
      {
        path: "base",
        element: <BaseFlow />,
      },
      {
        path: "custom",
        element: <CustomFlow />,
      },
      {
        path: "custom/edge",
        element: <CustomEdgeFlow />,
      },
    ],
  },
  {
    path: "/user/list",
    element: <UserList />,
  },
  {
    path: "/*",
    element: <NotFindPage />,
  },
];
export default routes;
