const context = new AudioContext();
const nodes = new Map();
context.suspend();

const osc = context.createOscillator();
osc.frequency.value = 440;
osc.type = "square";
osc.start();

const amp = context.createGain();
amp.gain.value = 0.5;

osc.connect(amp);
amp.connect(context.destination);

nodes.set("osc", osc);
nodes.set("amp", amp);
nodes.set("output", context.destination);

export function isRunning() {
  return context.state === "running";
}

export function toggleAudio() {
  return isRunning() ? context.suspend() : context.resume();
}

export function createAudioNode(id, type, data) {
  switch (type) {
    case "osc":
      const osc = context.createOscillator();
      osc.frequency.value = data.frequency;
      osc.type = data.type;
      osc.start();

      nodes.set(id, osc);
      break;
    case "amp":
      const amp = context.createGain();
      amp.gain.value = data.gain;
      nodes.set(id, amp);
      break;
  }
}

export function updateAudioNode(id, data) {
  const node = nodes.get(id);
  for (const [key, value] of Object.entries(data)) {
    if (node[key] instanceof AudioParam) {
      node[key].value = value;
    } else {
      node[key] = value;
    }
  }
}

export function removeAudioNode(id) {
  const node = nodes.get(id);
  node.disconnect();
  nodes.stop?.();

  nodes.delete(id);
}

export function connect(sourceId, targetId) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);
  source.connect(target);
}

export function disconnect(sourceId, targetId) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);
  source.disconnect(target);
}
