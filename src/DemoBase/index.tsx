import React, { useCallback } from "react";
import {
  ReactFlowProvider,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initNodes = [
  {
    id: "1",
    position: {
      x: 0,
      y: 0,
    },
    data: {
      label: "input node1",
    },
  },
  {
    id: "2",
    position: {
      x: 0,
      y: 100,
    },
    data: {
      label: "input node2",
    },
  },
];

const initEdges = [
  {
    id: "e1->2",
    source: "1",
    target: "2",
    label: "from to",
    type: "step",
  },
];

export default function BaseFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params) => setEdges((edgs) => addEdge(params, edgs)),
    [setEdges]
  );

  const lines = BackgroundVariant.Dots;
  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background variant={lines} gap={15} size={2} />
      </ReactFlow>
    </ReactFlowProvider>
  );
}
