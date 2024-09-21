import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

import "./text-updater-node.css";

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  return (
    <>
      <div className="text-updater-node">
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <div>
          <label htmlFor="text">Text: </label>
          <input
            type="text"
            id="text"
            name="text"
            className="nodrag"
            onChange={onChange}
          />
        </div>
        <Handle
          id="a"
          type="source"
          position={Position.Bottom}
          style={{ left: 40 }}
          isConnectable={isConnectable}
        />
        <Handle
          id="b"
          type="source"
          position={Position.Bottom}
          style={{ left: 120 }}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}

export default TextUpdaterNode;
