# x-assign
An improved Object.assign that will merge nested objects and concatenate arrays.

[![Coverage Status](https://coveralls.io/repos/github/mvoorberg/x-assign/badge.svg?branch=main)](https://coveralls.io/github/mvoorberg/x-assign?branch=main)
[![Build Status](https://travis-ci.com/mvoorberg/x-assign.svg?branch=main)](https://travis-ci.com/mvoorberg/x-assign)
## Installation

```bash
$ npm install x-assign
```

## Usage

```javascript
const XAssign = require("x-assign");

const objA = {
  car: ["vroom"],
  pear: "green",
  banana: { yellow: "$0.69", brown: "$0.39" },
};
const objB = {
  car: ["beep", "crash"],
  cat: "meow",
  cow: "moo",
  banana: { green: "$0.89", yellow: "$0.56 sale!" },
};
const objC = {
  duck: {says: "quack"},
};

const result = XAssign.assign(objA, objB, objC);

console.log(result); 
{
      car: ["vroom", "beep", crash],
      pear: "green",
      banana: { green: "$0.89", yellow: "$0.56 sale!", brown: "$0.39"  },
      cat: "meow",
      cow: "moo",
      duck: {says: "quack"},
 }
 ```
 See more [examples in the tests](https://github.com/mvoorberg/x-assign/blob/main/test/x-assign.spec.js)!

## Need Support?
x-assign is a [software development project](https://binaryops.ca) by BinaryOps Software Inc.
