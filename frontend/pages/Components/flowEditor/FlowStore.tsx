import { useMemo } from "react";
import create from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

import { Data as MailNodeData } from "./nodes/SendMailNode";

type SendMailNodeType = Node<MailNodeData>;
type MyNode = Node | SendMailNodeType;
type RFState = {
  nodes: MyNode[];
  edges: Edge[];
  currentFlowId: string;
  setCurrentFlowId: any;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: any;
  addEdge: any;
  removeNode: any;
  updateNodeData: any;
  saveFlow: any;
  reset: any;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  currentFlowId: "",
  nodes: [],
  edges: [],
  reset: () => {
    set({
      currentFlowId: "",
      nodes: [],
      edges: [],
    });
  },
  setCurrentFlowId: (id: string) => {
    set({
      currentFlowId: id,
    });
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  saveFlow: (id: string) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: {
          nodes: get().nodes,
          edges: get().edges,
        },
      }),
    };

    fetch("/api/flows/" + get().currentFlowId, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
      });
  },
  addNode: (newNode: Node) => {
    set({
      nodes: get().nodes.concat(newNode),
    });
  },
  removeNode: (id: string) => {
    const nodes = [...get().nodes];
    const index = nodes.findIndex((node) => node.id === id);

    if (index < 0) {
      console.error("Could not find node with ID %s to delete", id);
      return;
    }

    nodes.splice(index, 1);

    set({ nodes });
  },
  addEdge: (newEdge: Edge) => {
    set({
      edges: get().edges.concat({
        ...newEdge,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 30,
          height: 30,
        },
        animated: true,
        style: { color: "red!important" },
      }),
    });
    console.log(get().edges);
  },
  updateNodeData<TData>(nodeId: string, data: TData) {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, ...data };
        }
        return node;
      }),
    });
  },
}));

export default useStore;

export function useNodeData<T>(id: string) {
  const nodes = useStore((store) => store.nodes);

  const nodeData = useMemo(() => {
    return nodes.find((node) => node.id === id)?.data;
  }, [nodes, id]);

  return nodeData as T;
}
