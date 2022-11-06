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
  updateNodeMail: any;
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
    console.log(newNode, get().nodes);
  },
  addEdge: (newEdge: Edge) => {
    set({
      edges: get().edges.concat(newEdge),
    });
    console.log("edge", newEdge, get().edges);
  },
  updateNodeMail(nodeId: string, mail: string) {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, mail };
        }
        return node;
      }),
    });
    console.log(get().nodes);
  },
}));

export default useStore;
