import React, { useState, useEffect } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import "./index.css";

import CustomEdgeFlow from "../DemoCustomEdge";
import CustomFlow from "../DemoCustomNode";
import { Outlet, useNavigate, useRoutes } from "react-router-dom";
import routes from "../routes.tsx";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [
  {
    key: "/ant",
    icon: React.createElement(UserOutlined),
    label: "ant demo",
    children: [
      { key: "/antd/date/picker", label: "picker" },
      { key: "/antd/button", label: "button" },
      { key: "/antd/page", label: "page" },
      { key: "/antd/card", label: "card" },
      { key: "/antd/table", label: "table" },
      { key: "/antd/table2", label: "table2" },
    ],
  },
  {
    key: "/flow",
    icon: React.createElement(LaptopOutlined),
    label: "flow demo",
    children: [
      { key: "/flow/base", label: "base" },
      { key: "/flow/custom", label: "custom" },
      { key: "/flow/custom/edge", label: "custom edge" },
    ],
  },
  {
    key: "/msw",
    icon: React.createElement(NotificationOutlined),
    label: "msw demo",
    children: [{ key: "/user/list", label: "mock user" }],
  },
];
const items3: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `/sub${key}`,
    // React.createElement 是 React 中的一个核心函数，主要用于创建新的 React 元素（即虚拟 DOM 节点）。
    // 这个函数接受三个参数：类型（通常是组件名或者标签名）、属性对象以及子元素。
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: `test${subKey}`,
        label: `option${subKey}`,
      };
    }),
  };
});

const AntdLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const element = useRoutes(routes);
  const [path, setPath] = useState("/");

  useEffect(() => {
    console.log("---current已经改变---", path);
    navigate(path);
  }, [path]);

  const onClick = (e) => {
    console.log(e);
    // navigate(e.key); 出错
    setPath(e.key); // 设置current的值为e.key的值
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
            onClick={onClick}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
            style={{ margin: "16px 0" }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* <CustomEdgeFlow /> */}
            {/* <CustomFlow /> */}
            <div style={{ height: "100%" }}>
              {element}
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AntdLayout;
