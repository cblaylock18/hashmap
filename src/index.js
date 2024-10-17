import { HashMap } from "./hashmap.js";

// const test = new HashMap();
// test.set("Hello", "I am the oldestest value");
// console.table(test.buckets);
// test.set("Hello", "I am the oldestester value");
// console.table(test.buckets);
// test.set("Carlosssss", "I am the oldest value");
// console.table(test.buckets);
// test.set("Carloss", "I am the old value");
// console.table(test.buckets);
// test.set("Carlos", "I am the new value");
// console.table(test.buckets);
// console.log(test.get("Carlosssss"));
// console.log(test.has("Carlos"));
// // console.log(test.remove("Carlosssss"));
// // console.table(test.buckets);
// console.log(test.length());
// // test.clear();
// // console.log(test.buckets);
// console.log(test.keys());
// console.log(test.values());
// console.log(test.entries());
// console.log(test.getNumberOfBuckets());

// Odin test
const test = new HashMap(); // or HashMap() if using a factory
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("popsicle", "green");
test.set("coat", "orange");
test.set("fish", "spotted");
test.set("zebras", "striped");
test.set("fishies", "many");
test.set("whale", "big");

console.table(test);
console.table(test.entries());
test.set("apple", "not red");
console.table(test.entries());

test.set("moon", "silver");
console.table(test);
console.table(test.entries());

test.set("popsicle", "not green");
test.set("coat", "not orange");
test.set("fish", "not spotted");
console.table(test.entries());

console.log(test.get("coat"));
console.log(test.has("coats"));
console.log(test.remove("moon"));
console.table(test);
console.table(test.entries());
console.log(test.remove("moon"));
console.table(test);
console.table(test.entries());
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());

