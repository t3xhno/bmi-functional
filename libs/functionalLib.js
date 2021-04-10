// Defining map/filter implemented through reduce,
// compose and transduce functions
const redFn = (acc, x) => acc.concat(x);
const mapping = fn => reducer => (acc, x) => reducer(acc, fn(x));
const filtering = pred => reducer => (acc, x) => pred(x) ? reducer(acc, x) : acc;
const compose = (...fns) => arg => fns.reduceRight((acc, fn) => fn(acc), arg);
const transduce = (xform, init, data, reducer = redFn) => data.reduce(xform(reducer), init);

module.exports = { mapping, filtering, transduce, compose };