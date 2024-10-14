import React, { useCallback } from "react";

const DraggableItem = ({ data, children }) => {
  const handleDragStart = (event) => {
    const clonedNode = event.currentTarget.cloneNode(true);
    clonedNode.style.position = "absolute";
    clonedNode.style.top = "-500px";
    clonedNode.style.right = "-500px";
    clonedNode.classList.add("cursor-grabbing");
    document.body.appendChild(clonedNode);
    event.dataTransfer.setDragImage(clonedNode, 0, 0);
    event.dataTransfer.setData("nodedata", JSON.stringify(data));

    const cleanupClone = () => {
      if (clonedNode.parentNode) {
        clonedNode.parentNode.removeChild(clonedNode);
      }
      document.removeEventListener("dragend", cleanupClone);
    };

    document.addEventListener("dragend", cleanupClone);
  };

  return (
    <div draggable onDragStart={handleDragStart}>
      {children}
    </div>
  );
};

const DropZone = () => {
  const onDragOver = useCallback((event) => {
    console.log("onDragOver");
    event.preventDefault();
    if (event.dataTransfer.types.some((type) => type === "nodedata")) {
      event.dataTransfer.dropEffect = "move";
    } else {
      event.dataTransfer.dropEffect = "copy";
    }
  }, []);

  const onDrop = (event) => {
    console.log("Dropped data:");
    event.preventDefault();
    const dataString = event.dataTransfer.getData("nodedata");
    const data = JSON.parse(dataString);
    console.log("Dropped data:", data);
  };

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{ border: "1px solid black", padding: "1rem" }}
    >
      Drop here
    </div>
  );
};

//  onDragStart ==>  onDrop  ==>  onDragOver
const DemoDragEvent2 = () => {
  const data = { type: "ChatInput", node: { id: 1, name: "Chat Input Node" } };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DraggableItem data={data}>Drag me</DraggableItem>
      <DropZone />
    </div>
  );
};

export default DemoDragEvent2;
