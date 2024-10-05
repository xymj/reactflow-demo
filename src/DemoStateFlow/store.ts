import { create } from "zustand";

import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";


import initNodes from "./nodes";
import initEdges from "./edges";

import { AppNode, AppState, ColorNode } from "./types";

// 函数签名：
    // isColorChooserNode(node: AppNode): node is ColorNode
// 接受一个 AppNode 类型的参数 node。
//  返回值类型是 node is ColorNode，表示这是一个类型断言函数。
// 函数体：
//  检查 node.type 是否等于 "colorChooser"。
//  如果相等，则返回 true；否则返回 false。
// function isColorChooserNode(node: AppNode): node is ColorNode {
function isColorChooserNode(node: AppNode) {
    return node.type === "colorChooser";
}

const useFlowState = create<AppState>((set, get) => ({
id: "flow-1",
name:"save-flow-1",
nodes: initNodes,
edges: initEdges,
onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
},
    onEdgesChange: (changes) => {
        set({ edges: applyEdgeChanges(changes, get().edges) });
    },
    onConnect: (connection) => {
        set({ edges: addEdge(connection, get().edges) });
    },
    setNodes: (nodes) => {
        set({ nodes });
    },
    setEdges: (edges) => {
        set({ edges });
    },
    updateNodeColor: (nodeId: string, color: string) => {
        set({
            nodes : get().nodes.map((node) => {
                if (node.id === nodeId && isColorChooserNode(node)) {
                    return { ...node, data: { ...node.data, color } };
                }
                return node;
            }),
        })
    },
}));

export default useFlowState;