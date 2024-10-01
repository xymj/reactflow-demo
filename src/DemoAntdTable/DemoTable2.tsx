import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import axios from "axios";

interface DataType {
  id: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const DemoTable2: React.FC = () => {
  const columnsDefault: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      //   render: (_, { tags }) => (
      //     <>
      //       {tags.map((tag) => {
      //         let color = tag.length > 5 ? "geekblue" : "green";
      //         if (tag === "loser") {
      //           color = "volcano";
      //         }
      //         return (
      //           <Tag color={color} key={tag}>
      //             {tag.toUpperCase()}
      //           </Tag>
      //         );
      //       })}
      //     </>
      //   ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a onClick={(e) => deleteClick(e, record.id, dataSource)}>Delete</a>
        </Space>
      ),
    },
  ];

  const deleteClick = (e, id, ds) => {
    setColumns(columnsDefault);
    console.log(`deleteClick id===: ${JSON.stringify(id)}`);
    console.log(`deleteClick ds: ${JSON.stringify(ds)}`);
    console.log(`deleteClick dataSource: ${JSON.stringify(dataSource)}`);
    setDataSource(dataSource.filter((item) => item.id !== id));
    console.log(`deleteClick filter dataSource: ${JSON.stringify(dataSource)}`);
  };

  const data: DataType[] = [
    {
      id: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      id: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      id: 3,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const fetchData = async () => {
    const response = await axios.get("/api/user/list");
    console.log(`response data:${JSON.stringify(response.data)}`);
    setDataSource([...response.data.list]);
    setColumns(columnsDefault);
  };

  //   const handleDelete = (id: number) => {
  //     const newData = dataSource.filter((item) => item.id !== id);
  //     setDataSource(newData);
  //     message.success(`Deleted row with ID ${id}`);
  //   };

  useEffect(() => {
    fetchData();
  }, []);

  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState(columnsDefault);

  return (
    <>
      <Table<DataType> columns={columns} dataSource={dataSource} />
    </>
  );
};

export default DemoTable2;
