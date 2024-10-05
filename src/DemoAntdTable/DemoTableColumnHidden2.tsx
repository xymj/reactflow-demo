import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Checkbox,
  Divider,
  Table,
  Space,
  Button,
  message,
  Tag,
  PaginationProps,
} from "antd";
import type { CheckboxOptionType, TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  phone: number;
  tags: string;
}

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

// const data: DataType[] = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York Park",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 40,
//     address: "London Park",
//   },
// ];

// const columns: TableColumnsType<DataType> = [];

const App: React.FC = () => {
  const columns: TableColumnsType<DataType> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "年龄", dataIndex: "age", key: "age" },
    { title: "性别", dataIndex: "gender", key: "gender" },
    { title: "地址", dataIndex: "address", key: "address" },
    { title: "电话", dataIndex: "phone", key: "phone" },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (_, record) => {
        let color = _.length > 5 ? "geekblue" : "green";
        if (_ === "loser") {
          color = "volcano";
        }

        return (
          <Tag color={color} key="tags">
            {_.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
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
    },
  ];
  const defaultCheckedList = columns.map((item) => item.key);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);

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

  const fetchData = async () => {
    const response = await axios.get("/api/user/list");
    console.log(`response data:${JSON.stringify(response.data)}`);
    setDataSource([...response.data.list]);
    setTotal(response.data.list.length);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = columns
    .filter((item) => item.key !== "action")
    .map(({ key, title }) => ({
      label: title,
      value: key,
    }));

  const newColumns = columns.map((item) => {
    console.log(`change columns : ${item.key}`);
    return {
      ...item,
      hidden: !checkedList.includes(item.key as string),
    };
  });

  const onChange: PaginationProps["onChange"] = (page, pageSize) => {
    console.log(`Page: ${page}, pageSize: ${pageSize}`);
  };
  return (
    <>
      <Divider>指标列</Divider>
      <Checkbox.Group
        value={checkedList}
        options={options as CheckboxOptionType[]}
        onChange={(value) => {
          const col = value as string[];
          col.push("action");
          setCheckedList(col);
        }}
      />
      <Table<DataType>
        columns={newColumns}
        dataSource={dataSource}
        style={{ marginTop: 24 }}
        pagination={{
          position: ["bottomRight"],
          showQuickJumper: true,
          onChange: onChange,
          total: total,
          showTotal: (total) => `Total ${total} items`,
          defaultPageSize: 5,
          defaultCurrent: 1,
        }}
      />
    </>
  );
};

export default App;
