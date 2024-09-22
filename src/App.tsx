import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import BaseFlow from "./DemoBase";
import CustomFlow from "./DemoCustomNode";
import CustomEdgeFlow from "./DemoCustomEdge";

function App() {
  // return <BaseFlow />;
  // return <CustomFlow />;
  return <CustomEdgeFlow />;
}

export default App;
