import React, { useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./index.css";

import Sidebar from "./Sidebar";
import { DnDProvider, useDnDContext } from "./DnDContext";
import ChartInputNode from "./ChatInput";
import { AppNode } from "./ChatInput";

const nodeTypes = {
  chartInputNode: ChartInputNode,
};
const initialNodes = [
  {
    id: "1",
    type: "chartInputNode",
    data: { label: "chart input node", value: "chart input node contest" },
    position: { x: 250, y: 5 },
  },
] as AppNode[];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDflow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnDContext();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          fitView
        >
          <Controls />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
};

export default function DemoDragAndDropFlow() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <DnDflow />
      </DnDProvider>
    </ReactFlowProvider>
  );
}
