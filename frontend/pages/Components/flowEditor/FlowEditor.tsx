import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { Background, Controls, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";

import { SendMailNode } from "./nodes/SendMailNode";
import useStore from "./FlowStore";
import { FormNode } from "./nodes/FormNode";
import uuid from "react-uuid";
import { ApprovalNode } from "./nodes/ApprovalNode";
import { RenderTemplateNode } from "./nodes/RenderTemplateNode";
import { ManualStartNode } from "./nodes/ManualStartNode";

const getId = () => uuid();

const FlowEditor = () => {
  const reactFlowWrapper = useRef(null);
  const nodeTypes = useMemo(
    () => ({
      sendMailNode: SendMailNode,
      formNode: FormNode,
      approvalNode: ApprovalNode,
      renderTemplateNode: RenderTemplateNode,
      manualStartNode: ManualStartNode,
    }),
    []
  );
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useStore();
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      // @ts-ignore: Object is possibly 'null'.
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        dragHandle: ".custom-drag-handle",
        sourcePosition: "right",
        targetPosition: "left",
        data: { nodeType: type },
      };

      addNode(newNode);
    },
    [reactFlowInstance]
  );

  const onInit = (reactFlowInstance: ReactFlowInstance) =>
    setReactFlowInstance(reactFlowInstance);

  return (
    <div
      className="reactflow-wrapper"
      ref={reactFlowWrapper}
      style={{ width: "100%", height: "100%" }}
    >
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onInit={onInit}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
