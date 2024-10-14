/**
 * 在 React 中，DragEvent 是一种特殊的事件对象，用于处理拖放（drag and drop）操作。拖放是一种常见的用户交互方式，通常用于文件上传、重新排列项目等场景。DragEvent 提供了一系列的方法和属性，可以帮助你更方便地处理拖放操作。

主要用途和特性
1. 拖动事件类型
React 支持多种拖动事件类型，每种事件类型都有特定的作用和触发时机。常见的拖动事件包括：

onDragStart: 当用户开始拖动元素时触发。
onDrag: 当用户正在拖动元素时持续触发。
onDragEnd: 当拖动操作结束时触发（无论成功还是失败）。
onDragEnter: 当被拖动的元素进入目标区域时触发。
onDragOver: 当被拖动的元素在目标区域内移动时持续触发。
onDragLeave: 当被拖动的元素离开目标区域时触发。
onDrop: 当被拖动的元素在目标区域内释放时触发。
2. DragEvent 对象的属性和方法
DragEvent 对象继承自 MouseEvent，并添加了一些专门用于拖放操作的属性和方法。以下是一些常用的属性和方法：

dataTransfer: 一个 DataTransfer 对象，用于存储和检索拖放过程中传递的数据。

setData(type, data): 设置拖放数据的类型和值。
getData(type): 获取指定类型的数据。
clearData([type]): 清除指定类型的数据。
dropEffect: 表示允许的放置效果（none, copy, move, link）。
effectAllowed: 表示允许的拖动效果（none, copy, copyLink, copyMove, link, linkMove, all, uninitialized）。
files: 包含被拖动的文件列表（如果是文件拖放）。
preventDefault(): 阻止浏览器默认行为（例如，在可拖放区域外释放文件时打开文件）。
 */

import React from "react";
const DraggableItem = ({ children }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", children);
  };

  return (
    <div draggable onDragStart={handleDragStart}>
      {children}
    </div>
  );
};

const DropZone = ({ onDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    onDrop(data);
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      Drop here
    </div>
  );
};

const DemoDragEvent = () => {
  const handleDrop = (data) => {
    alert(`Dropped: ${data}`);
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DraggableItem>Drag me</DraggableItem>
      <DropZone onDrop={handleDrop} />
    </div>
  );
};

export default DemoDragEvent;
