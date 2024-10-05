import React from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
const JsonDataViewer = () => {
  const data = {
    name: "Alice",
    age: 30,
    isStudent: false,
    address: {
      street: "123 Main St",
      city: "Anytown",
      country: "USA",
    },
    hobbies: ["reading", "coding", "traveling"],
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>JSON 数据示例</h2>
      <JsonView
        theme="vscode"
        dark
        className={"json-view-white"}
        customizeCopy={(copy) => {
          navigator.clipboard.writeText(JSON.stringify(copy));
        }}
        enableClipboard={true}
        collapsed={1}
        collapseStringMode="address"
        displaySize={10}
        src={data}
      />
    </div>
  );
};
export default JsonDataViewer;
