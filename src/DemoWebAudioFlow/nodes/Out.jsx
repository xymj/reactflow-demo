import React from "react";
import { Handle } from "@xyflow/react";
import {shallow, useShallow} from "zustand/shallow";
import  useAudioStore  from "../store";


const selector = (state) => ({
    isRunning: state.isRunning,
    toggleAudio: state.toggleAudio
})


export default function Out({id, data}) {
//    const {isRunning, toggleAudio} = useAudioStore(selector,shallow);
const {isRunning, toggleAudio} = useAudioStore(useShallow(selector));
   
   return (
    <div>
        <Handle type="target" position="top" id="a" />
        <button onClick={toggleAudio}>
            {isRunning ? 
                (<span role="img" aria-label="mute">
                🔈
                </span>) 
            : (<span role="img" aria-label="mute">
                 🔇
            </span>)}
        </button>
    </div>
   )
}
