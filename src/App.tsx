import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import AntdDatePicker from "./DemoAntd";
import AntdLayout from "./DemoAntdLayout";
import BaseFlow from "./DemoBase";
import CustomFlow from "./DemoCustomNode";
import CustomEdgeFlow from "./DemoCustomEdge";
import UserList from "./DemoMockServiceWorker/UserList";
import { useRoutes } from "react-router-dom";
// import routes from "./routes.tsx";

function App() {
  // return <BaseFlow />;
  // return <CustomFlow />;
  // return <CustomEdgeFlow />;
  // return <AntdDatePicker />;
  // return <AntdLayout />;
  // return <UserList />;
  // const element = useRoutes(routes);
  // return element;
  return <AntdLayout />;
}

export default App;
