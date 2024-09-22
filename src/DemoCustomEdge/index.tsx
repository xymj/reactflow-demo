import { useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import CustomEdge from "./CustomEdge";

const initNodes = [
  {
    id: "1",
    type: "default",
    position: {
      x: 0,
      y: 0,
    },
    data: {
      label: "textUpdate",
      value: 123,
    },
  },
  {
    id: "2",
    type: "default",
    position: {
      x: 0,
      y: 200,
    },
    data: {
      label: "default node",
    },
  },
  {
    id: "3",
    type: "output",
    position: {
      x: 200,
      y: 200,
    },
    data: {
      label: "output node",
    },
  },
];

const initEdges = [
  {
    id: "e1->2",
    type: "custom-edge",
    source: "1",
    target: "2",
  },
  {
    id: "e2->3",
    source: "2",
    target: "3",
  },
];

const edgeTypes = {
  "custom-edge": CustomEdge,
};

export default function CustomEdgeFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (connction) => {
      const edge = { ...connction, type: "custom-edge" };
      setEdges((originEdge) => addEdge(edge, originEdge));
    },
    [setEdges]
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode="system"
        fitView
      />
    </>
  );
}
