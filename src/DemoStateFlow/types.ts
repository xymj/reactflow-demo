import { Node, BuiltInNode, Edge, OnNodesChange, OnEdgesChange, OnConnect,  } from "@xyflow/react";


export type ColorNode = Node<{ label: string; color: string }, "colorChooser">;
export type AppNode = ColorNode | BuiltInNode;

export type AppState = {
    id: string;
    name: string;
    nodes: AppNode[];
    edges: Edge[];
    onNodesChange: OnNodesChange<AppNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: AppNode[]) => void;
    setEdges: (edges: Edge[]) => void;
    updateNodeColor: (nodeId: string, color: string) => void;
}

