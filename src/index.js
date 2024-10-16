import { Hashmap } from "./hashmap.js";

const test = new Hashmap();
test.set("Carlosssss", "I am the oldest value");
console.table(test.buckets);
test.set("Carloss", "I am the old value");
console.table(test.buckets);
test.set("Carlos", "I am the new value");
console.table(test.buckets);
console.log(test.get("Carlosssss"));
console.log(test.has("Carlos"));
