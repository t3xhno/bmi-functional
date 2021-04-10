// Import dataset and libs
const dataset = require('./data');
const F = require('./functionalLib');
const T = require('./timingLib');

// Desctucture console
const { log } = console;

// Define filters and maps needed
const getBMI = ({ height: h, weight: w, ...rest }) => ({ bmi: w / h ** 2, ...rest });
const roundDec = places => ({ bmi, ...rest }) => ({ bmi: bmi.toFixed(places), ...rest });
const isObese = ({ bmi, ...rest }) => bmi > 25.0;
const formatOutput = ({ name, bmi }) => `${name} has a BMI of ${bmi}, which indicates obesity.`;

// Put them together in an xform composer, and run it
const xform = F.compose(F.mapping(getBMI), F.mapping(roundDec(2)), F.filtering(isObese), F.mapping(formatOutput));
log(T.timeIt(F.transduce)(xform, [], dataset.data));