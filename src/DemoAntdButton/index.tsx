import { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Divider,
  ConfigProvider,
  Space,
  Radio,
  Tooltip,
} from "antd";
import { useResponsive } from "antd-style";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

export default function DemoButton() {
  const { xxl } = useResponsive();

  const [position, setPosition] = useState<"start" | "end">("end");

  const [dataSource, setDataSource] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("/api/user/list");
    console.log(`response data:${JSON.stringify(response.data)}`);
    setDataSource(response.data.list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClick = (id) => {
    console.log(`id: ${id}`);
    console.log(`dataSource: ${JSON.stringify(dataSource)}`);
    const upList = dataSource.filter((item) => item.id !== id);
    console.log(`upList: ${JSON.stringify(upList)}`);
    setDataSource(upList);
  };

  const onClick2 = (ds) => {
    console.log(`ds: ${JSON.stringify(ds)}`);
    console.log(`dataSource: ${JSON.stringify(dataSource)}`);
  };

  return (
    <>
      <Flex gap="small" wrap>
        <Button
          type="primary"
          value={1}
          onClick={() => onClick(dataSource[0]?.id)}
        >
          Primary Button
        </Button>
        <Button onClick={() => onClick2(dataSource)}>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>
      <Divider />

      <ConfigProvider componentSize={xxl ? "middle" : "small"}>
        <Flex vertical gap="middle">
          <Flex gap="middle" wrap>
            <Button color="default" variant="solid">
              Solid
            </Button>
            <Button color="default" variant="outlined">
              Outlined
            </Button>
            <Button color="default" variant="dashed">
              Dashed
            </Button>
            <Button color="default" variant="filled">
              Filled
            </Button>
            <Button color="default" variant="text">
              Text
            </Button>
            <Button color="default" variant="link">
              Link
            </Button>
          </Flex>
          <Flex gap="middle" wrap>
            <Button color="primary" variant="solid">
              Solid
            </Button>
            <Button color="primary" variant="outlined">
              Outlined
            </Button>
            <Button color="primary" variant="dashed">
              Dashed
            </Button>
            <Button color="primary" variant="filled">
              Filled
            </Button>
            <Button color="primary" variant="text">
              Text
            </Button>
            <Button color="primary" variant="link">
              Link
            </Button>
          </Flex>
          <Flex gap="middle" wrap>
            <Button color="danger" variant="solid">
              Solid
            </Button>
            <Button color="danger" variant="outlined">
              Outlined
            </Button>
            <Button color="danger" variant="dashed">
              Dashed
            </Button>
            <Button color="danger" variant="filled">
              Filled
            </Button>
            <Button color="danger" variant="text">
              Text
            </Button>
            <Button color="danger" variant="link">
              Link
            </Button>
          </Flex>
        </Flex>
      </ConfigProvider>
      <Divider />

      <Space>
        <Radio.Group
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <Radio.Button value="start">start</Radio.Button>
          <Radio.Button value="end">end</Radio.Button>
        </Radio.Group>
      </Space>
      <Divider orientation="left" plain>
        Preview
      </Divider>
      <Flex gap="small" vertical>
        <Flex wrap gap="small">
          <Tooltip title="search">
            <Button type="primary" shape="circle" icon={<SearchOutlined />} />
          </Tooltip>
          <Button type="primary" shape="circle">
            A
          </Button>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            iconPosition={position}
          >
            Search
          </Button>
          <Tooltip title="search">
            <Button shape="circle" icon={<SearchOutlined />} />
          </Tooltip>
          <Button icon={<SearchOutlined />} iconPosition={position}>
            Search
          </Button>
        </Flex>
        <Flex wrap gap="small">
          <Tooltip title="search">
            <Button shape="circle" icon={<SearchOutlined />} />
          </Tooltip>
          <Button icon={<SearchOutlined />} type="text" iconPosition={position}>
            Search
          </Button>
          <Tooltip title="search">
            <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
          </Tooltip>
          <Button
            type="dashed"
            icon={<SearchOutlined />}
            iconPosition={position}
          >
            Search
          </Button>
          <Button
            icon={<SearchOutlined />}
            href="https://www.google.com"
            iconPosition={position}
          />
          <Button type="primary" loading iconPosition={position}>
            Loading
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
