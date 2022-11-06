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
} from "reactflow";

import { Data as MailNodeData } from "./nodes/SendMailNode";

type SendMailNodeType = Node<MailNodeData>;
type MyNode = Node | SendMailNodeType;
type RFState = {
  nodes: MyNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: any;
  addEdge: any;
  removeNode: any;
  updateNodeData: any;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
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
      edges: get().edges.concat(newEdge),
    });
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
