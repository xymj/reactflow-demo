import { useCallback, useState } from "react";
import {
  ReactFlowProvider,
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeTypes,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
// import "./text-updater-node.css";

import TextUpdaterNode from "./TextUpdaterNode";

// const nodeTypes: NodeTypes = {
//   textUpdate: TextUpdaterNode,
// };

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

const initNodes = [
  {
    id: "1",
    type: "textUpdater",
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
    targetPosition: "top",
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
    targetPosition: "top",
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
    source: "1",
    target: "2",
    sourceHandle: "a",
  },
  {
    id: "e1->3",
    source: "1",
    target: "3",
    sourceHandle: "b",
  },
];

export default function CustomFlow() {
  const [nodes, setNodes] = useState(initNodes);
  const [edges, setEdges] = useState(initEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edg) => applyEdgeChanges(changes, edg)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connction) => setEdges((edg) => addEdge(connction, edg)),
    [setEdges]
  );

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        style={{ backgroundColor: "#B8CEFF" }}
      />
    </ReactFlowProvider>
  );
}
