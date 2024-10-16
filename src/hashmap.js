import { LinkedList } from "./linkedLists";

class Hashmap {
  constructor(loadFactor = 0.75) {
    this.numberOfBuckets = 16;
    this.loadFactor = loadFactor;
    this.buckets = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.numberOfBuckets;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);

    if (!this.buckets[hashCode]) {
      this.buckets[hashCode] = new LinkedList();
      this.buckets[hashCode].append(key, value);
    } else this.buckets[hashCode].append(key, value);
  }

  get(key) {
    const hashCode = this.hash(key);
    const currentBucket = this.buckets[hashCode];

    if (!currentBucket) {
      return null;
    } else {
      return currentBucket.findValueGivenKey(key);
    }
  }

  has(key) {
    const hashCode = this.hash(key);
    const currentBucket = this.buckets[hashCode];

    if (!currentBucket) {
      return null;
    } else {
      return currentBucket.containsKey(key);
    }
  }
}

export { Hashmap };
