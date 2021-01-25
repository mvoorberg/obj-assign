"use strict";
const expect = require("chai").expect;
const XAssign = require("..");

describe("XAssign", function () {

  const testKeys = [
    "apple",
    "pear",
    "banana",
    "dog",
    "cat",
    "cow",
    "car",
  ].sort();

  beforeEach(function () {
    // testRegistry = new PocketRegistry();
  });

  it("can merge three simple objects", function () {
    const objA = {
      apple: "red",
      pear: "green",
      banana: "yellow",
    };
    const objB = {
      dog: "bark",
      cat: "meow",
      cow: "moo",
    };
    const objC = {
      car: "beep",
    };
    const result = XAssign.assign(objA, objB, objC);
    expect(result.apple).to.equal("red");
    expect(result.dog).to.equal("bark");

    // Make sure that the keys are as expected
    expect(Object.keys(result).sort()).to.eql(testKeys);
  });

  it("can merge three simple objects with merged arrays", function () {
    const objA = {
      apple: "red",
      pear: "green",
      banana: ["yellow", "brown"],
    };
    const objB = {
      dog: "bark",
      cat: "meow",
      cow: "moo",
      banana: ["green"],
    };
    const objC = {
      car: "beep",
    };
    const result = XAssign.assign(objA, objB, objC);

    // the order is important!
    expect(result.banana).to.eql(["yellow", "brown", "green"]);

    // Make sure that the keys are as expected
    expect(Object.keys(result).sort()).to.eql(testKeys);
  });

  it("can merge three simple objects with merged nested objects", function () {
    const objA = {
      apple: "red",
      pear: "green",
      banana: { yellow: "$0.69", brown: "$0.39" },
    };
    const objB = {
      dog: "bark",
      cat: "meow",
      cow: "moo",
      banana: { green: "$0.89" },
    };
    const objC = {
      car: "beep",
    };
    const result = XAssign.assign(objA, objB, objC);

    // Make sure that the keys are as expected
    const expectResult = { yellow: "$0.69", brown: "$0.39", green: "$0.89" };
    expect(result.banana).to.eql(expectResult);
  });

  it("can merge three simple objects with merged nested objects with override", function () {
    const objA = {
      apple: "red",
      pear: "green",
      banana: { yellow: "$0.69", brown: "$0.39" },
    };
    const objB = {
      dog: "bark",
      cat: "meow",
      cow: "moo",
      banana: { green: "$0.89", yellow: "$0.56 sale!" },
    };
    const objC = {
      car: "beep",
    };
    const result = XAssign.assign(objA, objB, objC);

    // Make sure that the keys are as expected
    const expectResult = {
      yellow: "$0.56 sale!",
      brown: "$0.39",
      green: "$0.89",
    };
    expect(result.banana).to.eql(expectResult);
  });

  it("can merge objects with an array following an object", function () {
    const objA = {
      apple: "red",
      pear: "green",
      banana: { yellow: "$0.69", brown: "$0.39" },
    };
    const objB = {
      dog: "bark",
      cat: "meow",
      cow: "moo",
      banana: ["green", "yellow"],
    };
    const objC = {
      car: "beep",
    };
    const result = XAssign.assign(objA, objB, objC);

    // Make sure that the keys are as expected
    const expectResult = ["green", "yellow"];
    expect(result.banana).to.eql(expectResult);
  });

  it("can merge objects with an object following an array", function () {
    const objA = {
      apple: "red",
      pear: "green",
      banana: ["green", "yellow"],
    };
    const objB = {
      dog: "bark",
      cat: "meow",
      cow: "moo",
      banana: { yellow: "$0.69", brown: "$0.39" },
    };
    const objC = {
      car: "beep",
    };
    const result = XAssign.assign(objA, objB, objC);

    // Make sure that the keys are as expected
    const expectResult = { yellow: "$0.69", brown: "$0.39" };
    expect(result.banana).to.eql(expectResult);
  });

  it("can merge objects with an object following a null", function () {
    const objA = {
      apple: "red",
      banana: null,
    };
    const objB = {
      cow: "moo",
      banana: { yellow: "$0.69", brown: "$0.39" },
    };
    const objC = {
      car: "beep",
    };
    const result = XAssign.assign(objA, objB, objC);

    // Make sure that the keys are as expected
    const expectResult = { yellow: "$0.69", brown: "$0.39" };
    expect(result.banana).to.eql(expectResult);
  });

  it("can merge objects with an array following a null", function () {
    const objA = {
      apple: "red",
      banana: null,
    };
    const objB = {
      cow: "moo",
      banana: ["green", "yellow"],
    };
    const objC = {
      car: "beep",
    };
    const result = XAssign.assign(objA, objB, objC);

    // Make sure that the keys are as expected
    const expectResult = ["green", "yellow"];
    expect(result.banana).to.eql(expectResult);
  });

  it("can merge objects with a primitive following a null", function () {
    const objA = {
      apple: "red",
      banana: null,
    };
    const objB = {
      cow: "moo",
      banana: 123,
    };
    const objC = {
      car: "beep",
    };
    const result = XAssign.assign(objA, objB, objC);

    // Make sure that the keys are as expected
    const expectResult = 123;
    expect(result.banana).to.equal(expectResult);
  });

  it("can merge objects with a nested overlapping objects", function () {
    const objA = {
      apple: "red",
      banana: { yellow: "$0.69", brown: "$0.39" },
    };
    const objB = {
      cow: "moo",
      banana: {
        yellow: "$0.69",
        brown: { price: "$0.99", origin: "California" },
      },
    };
    const objC = {
      car: "beep",
    };
    const result = XAssign.assign(objA, objB, objC);

    // Make sure that the nested keys are as expected
    const expectResult = {
      apple: "red",
      cow: "moo",
      car: "beep",
      banana: {
        yellow: "$0.69",
        brown: { price: "$0.99", origin: "California" },
      },
    };
    expect(result.banana).to.eql(expectResult.banana);
    expect(result).to.eql(expectResult);
  });

  it("can merge objects skipping any null or empty ones", function () {
    const objA = {
      apple: "red",
    };
    const objB = null;
    const objC = {
      car: "beep",
    };
    const objD = [];
    const objE = {};
    const result = XAssign.assign(objA, objB, objC, objD, objE);

    // Make sure that the keys are as expected
    const expectResult = { apple: "red", car: "beep" };
    expect(result).to.eql(expectResult);
  });

});
