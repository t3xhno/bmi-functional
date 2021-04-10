// Import the dataset
const datasets = require('./data');

// Defining map/filter implemented through reduce,
// compose and transduce functions
const redFn = (acc, x) => acc.concat(x);
const mapping = fn => reducer => (acc, x) => reducer(acc, fn(x));
const filtering = pred => reducer => (acc, x) => pred(x) ? reducer(acc, x) : acc;
const compose = (...fns) => arg => fns.reduceRight((acc, fn) => fn(acc), arg);
const transduce = (xform, reducer, init, data) => data.reduce(xform(reducer), init);

// Desctucture console
const { log } = console;

// Time measuring utilities
const tElapsed = ([s, ns]) => `Execution time: ${(s * 1000 + ns / 1000000).toFixed(3)} ms.`;
const timeIt = fn => (...args) => {
    const start = process.hrtime();
    const output = fn(...args);
    log(tElapsed(process.hrtime(start)));
    return output;
};

// Define filters and maps needed
const getBMI = ({ height: h, weight: w, ...rest }) => ({ bmi: w / h ** 2, ...rest });
const roundDec = places => ({ bmi, ...rest }) => ({ bmi: bmi.toFixed(places), ...rest });
const isObese = ({ bmi, ...rest }) => bmi > 25.0;
const formatOutput = ({ name, bmi }) => `${name} has a BMI of ${bmi}, which indicates obesity.`;

// Put them together in an xform composer, and run it
const xform = compose(mapping(getBMI), mapping(roundDec(2)), filtering(isObese), mapping(formatOutput));
log(timeIt(transduce)(xform, redFn, [], datasets.data));