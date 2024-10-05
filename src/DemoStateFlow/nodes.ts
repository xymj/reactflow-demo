import { AppNode } from "./types"
const nodes = [{
    id: "1",
    type: "colorChooser",
    data: {
        label: "Node 1",
        color: "#4FD1C5"
    },
    position: {  x: 250, y: 25 },
},{
    id: "2",
    type: "colorChooser",
    data: {
        label: "Node 2",
        color: "#F6E05E"
    },
    position: {  x: 250, y: 100 },
},{
    id: "3",
    type: "colorChooser",
    data: {
        label: "Node 3",
        color: "#B794F4"
    },
    position: {  x: 250, y: 175 },
}] as AppNode[]

export default nodes;