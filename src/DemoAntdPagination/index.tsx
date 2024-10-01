import { Pagination, Divider, PaginationProps } from "antd";

export default function DemoPagination() {
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  // page, pageSize
  const onChange2: PaginationProps["onChange"] = (page, pageSize) => {
    console.log(`Page: ${page}, pageSize: ${pageSize}`);
  };

  return (
    <>
      <Pagination defaultCurrent={1} total={50} />
      <Divider />

      <Pagination align="start" defaultCurrent={1} total={50} />
      <br />
      <Pagination align="center" defaultCurrent={1} total={50} />
      <br />
      <Pagination align="end" defaultCurrent={1} total={50} />
      <Divider />

      <Pagination defaultCurrent={6} total={500} />
      <Divider />

      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={3}
        total={500}
      />
      <br />
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={3}
        total={500}
        disabled
      />
      <Divider />

      <Pagination
        showQuickJumper
        defaultCurrent={2}
        total={500}
        onChange={onChange}
      />
      <br />
      <Pagination
        showQuickJumper
        defaultCurrent={2}
        total={500}
        onChange={onChange}
        disabled
      />
      <br />
      <Pagination
        showQuickJumper
        defaultCurrent={2}
        total={500}
        onChange={onChange2}
        // disabled
      />
      <Divider />

      <Pagination
        total={85}
        showTotal={(total) => `Total ${total} items`}
        defaultPageSize={20}
        defaultCurrent={1}
      />
      <br />
      <Pagination
        total={85}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultPageSize={20}
        defaultCurrent={1}
      />
      <Divider />
    </>
  );
}
