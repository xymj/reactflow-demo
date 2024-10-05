import React from "react";
import { useState } from "react";
import { Button, Modal, Typography, Input, Flex } from "antd";
import { useShallow } from "zustand/shallow";
import { ReactFlow } from "@xyflow/react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import "@xyflow/react/dist/style.css";

import useFlowState from "./store";
import ColorChooserNode from "./ColorChooserNode";

const { Text, Paragraph } = Typography;
const nodeTypes = {
  colorChooser: ColorChooserNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

export default function DemoSateFlow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigator.clipboard.writeText(
      JSON.stringify(useFlowState.getState(), null, 4)
    );
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
    navigator.clipboard.writeText(
      JSON.stringify(useFlowState.getState(), null, 4)
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowState(useShallow(selector));

  const saveFlow = () => {
    const state = JSON.stringify(useFlowState.getState(), null, 4);
    setIsModalOpen(true);
    console.log(state);
  };

  const downloadFlow = () => {
    const name = useFlowState((state) => state.name);
    const state = JSON.stringify(useFlowState.getState(), null, 4);
    const blob = new Blob([state], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name + ".json";
    link.click();

    // 清除临时 URL
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  };

  const jsonViewFlow = () => {
    setIsModalOpen2(true);
  };
  return (
    <>
      <Flex gap="small" wrap style={{ marginLeft: "70%" }}>
        <Button type="primary" onClick={saveFlow}>
          save
        </Button>
        <Button type="primary" onClick={jsonViewFlow}>
          view
        </Button>
        <Button type="primary" onClick={downloadFlow}>
          download
        </Button>
      </Flex>
      <Modal
        centered
        title="Flow Content"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // width={"100%"}
        // height={"100%"}
        cancelText="取消"
        okText="复制"
      >
        {/* <Input.TextArea
          defaultValue={JSON.stringify(useFlowState.getState(), null, 4)}
        /> */}
        {/* <Paragraph code copyable style={{ width: "100%", innerHeight: "100%" }}>
          {JSON.stringify(useFlowState.getState(), null, 4)}
        </Paragraph> */}
        <div style={{ height: 500, overflow: "auto" }}>
          <pre>{JSON.stringify(useFlowState.getState(), null, 4)}</pre>
        </div>
      </Modal>
      <Modal
        // centered
        title="Flow Json View"
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        cancelText="取消"
        okText="确定"
      >
        <div style={{ height: 500, overflow: "auto" }}>
          <JsonView
            dark
            theme="vscode"
            enableClipboard={false}
            collapsed={1}
            collapseStringMode="address"
            collapseStringsAfterLength={100}
            src={JSON.parse(JSON.stringify(useFlowState.getState(), null, 4))}
          />
        </div>
      </Modal>
      ;
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      />
    </>
  );
}
