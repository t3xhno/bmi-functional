// Defining map/filter implemented through reduce,
// compose and transduce functions
const redFn = (acc, x) => acc.concat(x);
const mapping = fn => reducer => (acc, x) => reducer(acc, fn(x));
const filtering = pred => reducer => (acc, x) => pred(x) ? reducer(acc, x) : acc;
const compose = (...fns) => arg => fns.reduceRight((acc, fn) => fn(acc), arg);
const transduce = (xform, reducer, init, data) => data.reduce(xform(reducer), init);
// Define the dataset
const dataset = [
    {name: 'Marko', weight: 70, height: 1.9},
    {name: 'Jovan', weight: 50, height: 1.7},
    {name: 'Luka', weight: 40, height: 1.85},
    {name: 'Janko', weight: 65, height: 1.6},
    {name: 'Miloje', weight: 55, height: 1.65},
    {name: 'Sofija', weight: 120, height: 2.12},
    {name: 'Biljana', weight: 100, height: 1.83},
    {name: 'Nemanja', weight: 92, height: 1.81},
    {name: 'Arijan', weight: 78, height: 1.65},
    {name: 'Nikola', weight: 98, height: 1.5},
];
// Define filters and maps needed
const getBMI = ({ height, weight, ...rest }) => ({ bmi: weight / height ** 2, ...rest });
const roundDec = ({ bmi, ...rest }) => ({ bmi: bmi.toFixed(2), ...rest });
const isObese = ({ bmi, ...rest }) => bmi > 25.0;
const formatOutput = ({ name, bmi }) => `${name} has a BMI of ${bmi}, which indicates obesity.`;
// Put them together in an xform composer, and run it
const xform = compose(mapping(getBMI), mapping(roundDec), filtering(isObese), mapping(formatOutput));
const start = process.hrtime();
const outputData = transduce(xform, redFn, [], dataset);
console.log(`Execution time: ${process.hrtime(start)[0] + process.hrtime(start)[1] / 1000000}s.`);