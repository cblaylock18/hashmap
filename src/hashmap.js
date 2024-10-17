import { LinkedList } from "./linkedLists";

class HashMap {
  constructor(maxLoadFactor = 0.75) {
    this.maxBuckets = 16;
    this.bucketGrowthMultiplier = 2;
    this.maxLoadFactor = maxLoadFactor;
    this.capacity = 0;
    this.buckets = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.maxBuckets;
    }

    return hashCode;
  }

  set(key, value) {
    this.capacity = this.getNumberOfBuckets();

    if (this.capacity >= this.maxLoadFactor * this.maxBuckets) {
      const entries = this.entries();
      this.clear();
      this.maxBuckets = this.maxBuckets * this.bucketGrowthMultiplier;
      entries.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }

    const hashCode = this.hash(key);

    if (!this.buckets[hashCode]) {
      this.buckets[hashCode] = new LinkedList();
      this.buckets[hashCode].append(key, value);
    } else if (this.has(key)) {
      this.buckets[hashCode].updateValueGivenKey(key, value);
    } else {
      this.buckets[hashCode].append(key, value);
    }
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
      return false;
    } else {
      return currentBucket.containsKey(key);
    }
  }

  remove(key) {
    const hashCode = this.hash(key);
    const currentBucket = this.buckets[hashCode];

    if (!currentBucket) {
      return false;
    } else {
      const index = currentBucket.findKey(key);
      this.capacity = this.getNumberOfBuckets();
      return currentBucket.removeAt(index);
    }
  }

  getNumberOfBuckets() {
    let totalBuckets = 0;

    this.buckets.forEach((bucket) => {
      if (bucket) {
        if (bucket.size() > 0) {
          totalBuckets++;
        }
      }
    });
    return totalBuckets;
  }

  length() {
    let numberOfKeys = 0;

    this.buckets.forEach((bucket) => {
      const bucketSize = bucket.size();
      numberOfKeys += bucketSize;
    });

    return numberOfKeys;
  }

  clear() {
    this.buckets = [];
  }

  keys() {
    let allKeys = [];

    this.buckets.forEach((bucket) => {
      const thisBucketsKeys = bucket.listKeys();
      if (thisBucketsKeys) {
        allKeys = allKeys.concat(thisBucketsKeys);
      }
    });

    return allKeys;
  }

  values() {
    let allValues = [];

    this.buckets.forEach((bucket) => {
      const thisBucketsValues = bucket.listValues();
      if (thisBucketsValues) {
        allValues = allValues.concat(thisBucketsValues);
      }
    });

    return allValues;
  }

  entries() {
    let allEntries = [];

    this.buckets.forEach((bucket) => {
      const thisBucketsEntries = bucket.listEntries();
      if (thisBucketsEntries) {
        allEntries = allEntries.concat(thisBucketsEntries);
      }
    });

    return allEntries;
  }
}

export { HashMap };
