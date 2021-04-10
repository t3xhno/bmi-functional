const { log } = console;

// Time measuring utilities
const tElapsed = ([s, ns]) => `Execution time: ${(s * 1000 + ns / 1000000).toFixed(3)} ms.`;
const timeIt = fn => (...args) => {
    const start = process.hrtime();
    const output = fn(...args);
    log(tElapsed(process.hrtime(start)));
    return output;
};

module.exports = { tElapsed, timeIt };