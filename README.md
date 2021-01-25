# obj-assign
Simple Object.assign that will concat arrays 

[![Coverage Status](https://coveralls.io/repos/github/mvoorberg/obj-assign/badge.svg?branch=main)](https://coveralls.io/github/mvoorberg/obj-assign?branch=main)
[![Build Status](https://travis-ci.org/mvoorberg/obj-assign.svg?branch=v1.0.1)](https://travis-ci.org/mvoorberg/obj-assign)


## Installation

```bash
$ npm install obj-assign
```

## Usage

```javascript
const ObjAssign = require("obj-assign");

const a = {red: "apple"};
const b = {green: "pear"};
const c = ObjAssign.assign(a, b);

console.log(c); 
> {
>    red: "apple",
>    green: "pear"
> }
```

## Need Support?
Obj-Assign is a [software development project](https://binaryops.ca) by BinaryOps Software Inc.
