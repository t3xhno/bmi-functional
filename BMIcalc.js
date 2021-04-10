// Import dataset and libs
const dataset = require('./data');
const { mapping, filtering, compose, transduce } = require('./functionalLib');
const { timeIt } = require('./timingLib');

// Define filters and maps needed
const getBMI = ({ height: h, weight: w, ...rest }) => ({ bmi: w / h ** 2, ...rest });
const roundDec = places => ({ bmi, ...rest }) => ({ bmi: bmi.toFixed(places), ...rest });
const isObese = ({ bmi, ...rest }) => bmi > 25.0;
const formatOutput = ({ name, bmi }) => `${name} has a BMI of ${bmi}, which indicates obesity.`;

// Put them together in an xform composer, and run it
const xform = compose(mapping(getBMI), mapping(roundDec(2)), filtering(isObese), mapping(formatOutput));
console.log(timeIt(transduce)(xform, [], dataset.data));