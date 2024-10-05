import React from "react";
import { Node, Handle, NodeProps, Position } from "@xyflow/react";
import useFlowState from "./store";
import { ColorNode } from "./types";

export default function ColorChooserNode({ id, data }: NodeProps<ColorNode>) {
  const updateNodeColor = useFlowState((state) => state.updateNodeColor);
  return (
    <div style={{ backgroundColor: data.color, borderRadius: 10 }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ padding: 20 }}>
        <input
          type="color"
          defaultValue={data.color}
          onChange={(e) => updateNodeColor(id, e.target.value)}
          className="nodrag"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
