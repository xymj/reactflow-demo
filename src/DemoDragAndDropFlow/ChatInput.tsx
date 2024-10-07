import React from "react";
import { Node, Handle, NodeProps, Position, BuiltInNode } from "@xyflow/react";

export type ChatInputNode = Node<
  { label: string; value: string },
  "chartInputNode"
>;

export type AppNode = ChatInputNode | BuiltInNode;

const updateChatData = (id: string, value: string) => {
  console.log(id, value);
};

export default function ChartInputNode({ id, data }: NodeProps<ChatInputNode>) {
  return (
    <div style={{ backgroundColor: "blue", borderRadius: 10 }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ padding: 20 }}>
        <input
          type="text"
          value={data.value}
          onChange={(e) => updateChatData(id, e.target.value)}
          className="nodrag"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
