import React from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  Background,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import "../DemoTailwind/styles.css";

import { shallow, useShallow } from "zustand/shallow";
import useAudioStore from "./store";
import Osc from "./nodes/Osc";
import Amp from "./nodes/Amp";
import Out from "./nodes/Out";

const nodeTypes = {
  osc: Osc,
  amp: Amp,
  out: Out,
};

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onNodesDelete: store.onNodesDelete,
  onEdgesChange: store.onEdgesChange,
  onEdgesDelete: store.onEdgesDelete,
  addEdge: store.addEdge,
  createNode: store.createNode,
  onConnect: store.onConnect,
});

export default function DemoWebAudioFlow() {
  console.log("test~!!!!");
  // const store = useAudioStore(selector, shallow);
  const store = useAudioStore(useShallow(selector));

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={store.nodes}
        edges={store.edges}
        onNodesChange={() => store.onNodesChange}
        onNodesDelete={() => store.onNodesDelete}
        onEdgesChange={() => store.onEdgesChange}
        onEdgesDelete={() => store.onEdgesDelete}
        onConnect={() => store.onConnect}
        fitView
      >
        <Panel className="space-x-4" position="top-right">
          <button
            className="px-2 py-1 rounded bg-white shadow"
            onClick={() => store.createNode("osc")}
          >
            Add Osc
          </button>
          <button
            className="px-2 py-1 rounded bg-white shadow"
            onClick={() => store.createNode("amp")}
          >
            Add Amp
          </button>
        </Panel>
        <Background />
      </ReactFlow>
    </ReactFlowProvider>
  );
}
