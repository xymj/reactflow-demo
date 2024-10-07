import React from "react";
import { Handle } from "@xyflow/react";
import {shallow, useShallow} from "zustand/shallow";
import  useAudioStore  from "../store";


const selector = (store) => ({
    updateNode: store.updateNode,
  });


export default function Osc({id, data}) {
    // const {setFrequency, setType} = useAudioStore(selector(id), shallow);
    const store = useAudioStore(useShallow(selector));

    const onChangeFrequency = (event) => {
        console.log(event.target.value);
        store.updateNode(id, { frequency: +event.target.value });
    };

    const onChangeType = (event) => {
        console.log(event.target.value);
        store.updateNode(id, { type: event.target.value });
    };
    return (
        <div className="rounded-md bg-white shadow-xl">
             <p className="rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm">Osc</p>
                <label className="flex flex-col px-2 py-1">
                    <span>Frequency:</span>
                    <input 
                        className="nodrag"
                        type="range"
                        min="10"
                        max="1000"
                        value={data.frequency} 
                        onChange={onChangeFrequency}/>
                    <p className="text-right text-xs">{data.frequency} Hz</p>
                </label>
                <hr className="border-gray-200 mx-2" />
                <label className="flex flex-col px-2 pt-1 pb-4">
                    <span className="text-xs font-bold mb-2">Waveform</span>
                    <select className="nodag" value={data.type} onChange={onChangeType}>
                        <option value="sine">sine</option>
                        <option value="triangle">triangle</option>
                        <option value="sawtooth">sawtooth</option>
                        <option value="square">square</option>
                    </select>
                </label>
            <Handle className="w-2 h-2" type="source" position="bottom" id="a" />
        </div>
    )
}