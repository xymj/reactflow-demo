import { useEffect, useState, useContext } from "react";
import { createStore } from "zustand";
import {
  Table,
  Pagination,
  PaginationProps,
  Tag,
  Space,
  Button,
  message,
} from "antd";
import axios from "axios";

export default function DemoTable() {
  const colName = {
    id: "ID",
    name: "姓名",
    age: "年龄",
    gender: "性别",
    address: "地址",
    phone: "电话",
    tags: "标签",
    action: "操作",
  };
  const dataSourceDefault = [
    {
      id: 75171,
      name: "Sandra Smith",
      age: 30,
      gender: "Female",
      address: "湖北省 荆州市 公安县",
      phone: "187dddddddd",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columnsDefault = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const deleteClick = (e, id, ds) => {
    console.log(`deleteClick id: ${JSON.stringify(id)}`);
    console.log(`deleteClick dataSource: ${JSON.stringify(dataSource)}`);
    // console.log(`deleteClick columns: ${JSON.stringify(columns)}`);
    console.log(`deleteClick ds: ${JSON.stringify(ds)}`);

    message.success(`Deleted row with ID ${id}`);

    const list = dataSource.filter((item) => item.id !== id);
    console.log(`deleteClick list: ${JSON.stringify(list)}`);
    setDataSource(list);
    setTotal(list.length);
  };

  const buildRender = (_, record, col, ds) => {
    console.log(`buildRender _: ${JSON.stringify(_)}`);
    console.log(`buildRender record: ${JSON.stringify(record)}`);
    console.log(`buildRender col: ${JSON.stringify(col)}`);
    if (col === "tags") {
      let color = _.length > 5 ? "geekblue" : "green";
      if (_ === "loser") {
        color = "volcano";
      }
      return (
        <Tag color={color} key={col}>
          {_.toUpperCase()}
        </Tag>
      );
    }

    if (col === "action") {
      return (
        <Space size="middle">
          {/* <a>key:{record.id}</a> */}
          <a>key:{JSON.stringify(ds)}</a>
          <Button color="primary" variant="solid" size="small">
            modify
          </Button>
          <Button
            color="danger"
            variant="solid"
            size="small"
            onClick={(e) => deleteClick(e, record?.id, dataSource)}
          >
            delete
          </Button>
        </Space>
      );
    }
    return <>{_}</>;
  };

  const fetchData = async () => {
    const response = await axios.get("/api/user/list");
    console.log(`response data:${JSON.stringify(response.data)}`);
    setDataSource([...response.data.list]);
    setTotal(response.data.list.length);

    console.log(
      `Object.keys(response.data):${Object.keys(response.data.list[0])}`
    );
    const keys = Object.keys(response.data.list[0]);
    keys.push("action");
    console.log(`key value: ${colName[keys[0]]}`);

    const cols = keys.map((col, idx) => {
      return {
        title: colName[col],
        dataIndex: col,
        key: col,
        render: (_, record) => buildRender(_, record, col, dataSource),
        // ellipsis: col === "action" ? false : true,
      };
    });
    console.log(`cols: ${JSON.stringify(cols)}`);

    // setColumns(cols);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange2: PaginationProps["onChange"] = (page, pageSize) => {
    console.log(`Page: ${page}, pageSize: ${pageSize}`);
  };

  const [dataSource, setDataSource] = useState([]);
  //   const [columns, setColumns] = useState([]);
  const [total, setTotal] = useState(0);

  columnsDefault.push({
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        {/* <a>key:{record.id}</a> */}
        {/* <a>key:{JSON.stringify(dataSource)}</a> */}
        <Button color="primary" variant="solid" size="small">
          modify
        </Button>
        <Button
          color="danger"
          variant="solid"
          size="small"
          onClick={(e) => deleteClick(e, record?.id, dataSource)}
        >
          delete
        </Button>
      </Space>
    ),
  });

  return (
    <>
      <Table
        dataSource={dataSource}
        // columns存储在状态内，触发columns对应的render方法时，取不到外部dataSource，需要看下怎么动态隐藏和显示列
        columns={columnsDefault}
        pagination={{
          position: ["bottomRight"],
          showQuickJumper: true,
          onChange: onChange2,
          total: total,
          showTotal: (total) => `Total ${total} items`,
          defaultPageSize: 5,
          defaultCurrent: 1,
        }}
      />
    </>
  );
}
