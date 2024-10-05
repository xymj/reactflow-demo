import { useCallback, useState } from "react";
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import initialNodes from "./nodes";
import initialEdges from "./edges";

import initialNodes1 from "./nodes1";
import initialEdges1 from "./edges1";

import initialNodes2 from "./nodes2";
import initialEdges2 from "./edges2";
import { Button } from "antd";

const rfStyle = {
  backgroundColor: "#D0C0F7",
};

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const changeFlow = (type: "nodes" | "nodes1" | "nodes2") => {
    switch (type) {
      case "nodes":
        setNodes(initialNodes);
        setEdges(initialEdges);
        break;
      case "nodes1":
        setNodes(initialNodes1);
        setEdges(initialEdges1);
        break;
      case "nodes2":
        setNodes(initialNodes2);
        setEdges(initialEdges2);
        break;
      default:
        setNodes(initialNodes);
        setEdges(initialEdges);
        break;
    }
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginRight: 10 }}
        onClick={() => changeFlow("nodes")}
      >
        change nodes
      </Button>
      <Button
        type="primary"
        style={{ marginRight: 10 }}
        onClick={() => changeFlow("nodes1")}
      >
        change nodes1
      </Button>
      <Button
        type="primary"
        style={{ marginRight: 10 }}
        onClick={() => changeFlow("nodes2")}
      >
        change nodes2
      </Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        style={rfStyle}
        attributionPosition="top-right"
      >
        <Background />
      </ReactFlow>
    </>
  );
}

export default Flow;
