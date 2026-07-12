import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js';
import { makeCommunitiesSocket } from './communities.js';

let asciiPrinted = false;

// export the last socket layer
const makeWASocket = (config) => {
    if (!asciiPrinted) {
        console.log("\x1b[36m❄️  Y U K I   S T A G E  ❄️\x1b[0m");
        console.log("\x1b[35m👑 MessageBuilder Hybrid Client Initialized\x1b[0m");
        console.log("\x1b[35m⚡ Custom built by ZetaGo-Aurum for Yuki AI\x1b[0m\n");
        asciiPrinted = true;
    }
    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    };
    return makeCommunitiesSocket(newConfig);
};
export default makeWASocket;
//# sourceMappingURL=index.js.map