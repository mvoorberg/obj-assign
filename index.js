"use strict";

const ObjAssign = {
  assign: function (...args) {
    /**
     * Combine object properties or concat array properties
     *
     * @param {any} acc the target or accumulator
     * @param {any} obj object to apply
     */

    function apply(acc, obj) {
      if (obj == null || typeof obj !== "object") {
        return; // ignore non-object args
      }
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (Array.isArray(value)) {
          acc[key] =
            acc[key] && Array.isArray(acc[key])
              ? acc[key].concat(value)
              : value;
        } else if (typeof value === "object") {
          acc[key] = acc[key] || {};
          if (Array.isArray(acc[key])) {
            acc[key] = {}; // getting overridden with an Object!
            apply(acc[key], value);
          } else if (typeof acc[key] === "object") {
            apply(acc[key], value);
          } else {
			acc[key] = value;
          }
        } else {
          acc[key] = value;
        }
      });
    }

    /**
     * Apply merge for each object argument.
     */
    const result = {};
    args.forEach((obj) => apply(result, obj));

    return result;
  },
};

// Don't export a new instance of the registry, we want
// to be able to have more than one within our application.
module.exports = ObjAssign;
