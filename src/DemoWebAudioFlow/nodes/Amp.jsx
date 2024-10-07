import React from "react";
import { Handle } from "@xyflow/react";
import {shallow, useShallow} from "zustand/shallow";
import useAudioStore from "../store";



// 在 JavaScript 中，前缀 + 是一种类型转换操作，它将一个值转换为数字。具体来说，+ 号的作用如下：

// 如果操作数已经是数字，则不做任何改变。
// 如果操作数是字符串，并且可以被解析为有效的数字，则将其转换为数字。
// 如果操作数是布尔值，true 被转换为 1，而 false 被转换为 0。
// 对于其他类型的值（例如对象或 undefined），结果通常是 NaN（Not a Number）。

const selector = (store) => ({
    updateNode: store.updateNode,
  });
export default function Apm({id, data}) {
    // const {setGain} = useAudioStore(selector(id), shallow);
    const store = useAudioStore(useShallow(selector));
    return (
        <div className="rounded-md bg-white shadow-xl">
            <Handle className="w-2 h-2" type="target" position="top" id="a" />
            <p className="rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm">Amp</p>
            <label className="flex flex-col px-2 pt-1 pb-4">
                <p className="text-xs font-bold mb-2">Gain</p>
                <input 
                    className="nodag"
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01"
                    value={data.gain} 
                    onChange={(event) => store.updateNode(id, { gain: +event.target.value })}/>
                <p className="text-right text-xs">{data.gain.toFixed(2)}</p>
            </label>
            <Handle className="w-2 h-2" type="source" position="bottom" id="b" />
        </div>
    );
}