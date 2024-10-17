/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hashmap.js":
/*!************************!*\
  !*** ./src/hashmap.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HashMap: () => (/* binding */ HashMap)
/* harmony export */ });
/* harmony import */ var _linkedLists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linkedLists */ "./src/linkedLists.js");

class HashMap {
  constructor() {
    let maxLoadFactor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.75;
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
      entries.forEach(entry => {
        this.set(entry[0], entry[1]);
      });
    }
    const hashCode = this.hash(key);
    if (!this.buckets[hashCode]) {
      this.buckets[hashCode] = new _linkedLists__WEBPACK_IMPORTED_MODULE_0__.LinkedList();
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
    this.buckets.forEach(bucket => {
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
    this.buckets.forEach(bucket => {
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
    this.buckets.forEach(bucket => {
      const thisBucketsKeys = bucket.listKeys();
      if (thisBucketsKeys) {
        allKeys = allKeys.concat(thisBucketsKeys);
      }
    });
    return allKeys;
  }
  values() {
    let allValues = [];
    this.buckets.forEach(bucket => {
      const thisBucketsValues = bucket.listValues();
      if (thisBucketsValues) {
        allValues = allValues.concat(thisBucketsValues);
      }
    });
    return allValues;
  }
  entries() {
    let allEntries = [];
    this.buckets.forEach(bucket => {
      const thisBucketsEntries = bucket.listEntries();
      if (thisBucketsEntries) {
        allEntries = allEntries.concat(thisBucketsEntries);
      }
    });
    return allEntries;
  }
}


/***/ }),

/***/ "./src/linkedLists.js":
/*!****************************!*\
  !*** ./src/linkedLists.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkedList: () => (/* binding */ LinkedList)
/* harmony export */ });
class Node {
  constructor() {
    let key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
  }
  append(key, value) {
    const newNode = new Node(key, value);
    let currentNode = this.head;
    if (currentNode === null) {
      this.head = newNode;
    } else {
      while (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = newNode;
    }
  }
  prepend(key, value) {
    const newNode = new Node(key, value);
    newNode.nextNode = this.head;
    this.head = newNode;
  }
  size() {
    let counter = 0;
    let currentNode = this.head;
    while (currentNode) {
      counter++;
      currentNode = currentNode.nextNode;
    }
    return counter;
  }
  headNode() {
    return this.head === null ? null : this.head.value;
  }
  tailNode() {
    let currentNode = this.head;
    if (currentNode === null) {
      return null;
    } else {
      while (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
      }
      return currentNode;
    }
  }
  at(index) {
    let currentNode = this.head;
    if (currentNode === null) {
      return null;
    }
    for (let i = 0; i <= index; i++) {
      if (i === index) {
        return currentNode;
      } else if (!currentNode.nextNode) {
        return null;
      } else {
        currentNode = currentNode.nextNode;
      }
    }
    return null;
  }
  pop() {
    let currentNode = this.head;
    let previousNode = null;
    if (currentNode !== null) {
      while (currentNode.nextNode) {
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
      }
      previousNode.nextNode = null;
    }
  }
  findValueGivenKey(key) {
    let currentNode = this.head;
    let value = null;
    if (currentNode !== null) {
      do {
        if (currentNode.key === key) {
          value = currentNode.value;
          break;
        }
        currentNode = currentNode.nextNode;
      } while (currentNode);
    }
    return value;
  }
  updateValueGivenKey(key, value) {
    let currentNode = this.head;
    if (currentNode !== null) {
      do {
        if (currentNode.key === key) {
          currentNode.value = value;
          break;
        }
        currentNode = currentNode.nextNode;
      } while (currentNode);
    }
  }
  findKey(key) {
    let currentNode = this.head;
    let contains = false;
    let index = null;
    if (currentNode !== null) {
      index = -1;
      while (currentNode && !contains) {
        index++;
        if (currentNode.key === key) {
          contains = true;
        }
        currentNode = currentNode.nextNode;
      }
    }
    return contains === false ? null : index;
  }
  containsKey(key) {
    let currentNode = this.head;
    let contains = false;
    if (currentNode !== null) {
      do {
        if (currentNode.key === key) {
          contains = true;
        }
        currentNode = currentNode.nextNode;
      } while (currentNode);
      return contains;
    }
  }
  listKeys() {
    let currentNode = this.head;
    let keys = [];
    if (currentNode) {
      do {
        keys.push(currentNode.key);
        currentNode = currentNode.nextNode;
      } while (currentNode);
      return keys;
    }
  }
  containsValue(value) {
    let currentNode = this.head;
    let contains = false;
    if (currentNode !== null) {
      do {
        if (currentNode.value === value) {
          contains = true;
        }
        currentNode = currentNode.nextNode;
      } while (currentNode);
      return contains;
    }
  }
  findValue(value) {
    let currentNode = this.head;
    let contains = false;
    let index = null;
    if (currentNode !== null) {
      index = -1;
      while (currentNode && !contains) {
        index++;
        if (currentNode.value === value) {
          contains = true;
        }
        currentNode = currentNode.nextNode;
      }
    }
    return contains === false ? null : index;
  }
  listValues() {
    let currentNode = this.head;
    let values = [];
    if (currentNode !== null) {
      do {
        values.push(currentNode.value);
        currentNode = currentNode.nextNode;
      } while (currentNode);
      return values;
    }
  }
  listEntries() {
    let currentNode = this.head;
    let entries = [];
    if (currentNode !== null) {
      do {
        entries.push([currentNode.key, currentNode.value]);
        currentNode = currentNode.nextNode;
      } while (currentNode);
      return entries;
    }
  }
  insertAt(key, value, index) {
    if (index === 0) {
      this.prepend(value);
      return;
    } else if (!this.at(index)) {
      return;
    }
    const newNode = new Node(key, value);
    let currentNode = this.head;
    let previousNode = null;
    for (let i = 0; i <= index; i++) {
      if (i === index) {
        console.log(previousNode);
        console.log(currentNode);
        previousNode.nextNode = newNode;
        newNode.nextNode = currentNode;
      } else {
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
      }
    }
  }
  removeAt(index) {
    if (!this.at(index)) {
      return false;
    }
    let currentNode = this.head;
    let previousNode = null;
    for (let i = 0; i <= index; i++) {
      if (index === 0) {
        this.head = currentNode.nextNode;
      } else if (i === index) {
        previousNode.nextNode = currentNode.nextNode;
      } else {
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
      }
    }
    return true;
  }
  toString() {
    let string = "";
    let currentNode = this.head;
    do {
      if (currentNode) {
        string = string + `( ${currentNode.key}: ${currentNode.value} )`;
        string = string + " -> ";
        currentNode = currentNode.nextNode;
      }
      if (!currentNode) {
        string = string + `( null )`;
      }
    } while (currentNode);
    return string;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hashmap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hashmap.js */ "./src/hashmap.js");


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
const test = new _hashmap_js__WEBPACK_IMPORTED_MODULE_0__.HashMap(); // or HashMap() if using a factory
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxJQUFJLENBQUM7QUFDbkJKLE9BQU8sQ0FBQ0ssS0FBSyxDQUFDRCxJQUFJLENBQUNyRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzdCaUQsT0FBTyxDQUFDQyxHQUFHLENBQUNHLElBQUksQ0FBQ3BFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDMUJnRSxPQUFPLENBQUNDLEdBQUcsQ0FBQ0csSUFBSSxDQUFDakMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN4QjZCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRyxJQUFJLENBQUM1QixNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzFCd0IsT0FBTyxDQUFDQyxHQUFHLENBQUNHLElBQUksQ0FBQ3JELE9BQU8sQ0FBQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RlbXBsYXRlLTEvLi9zcmMvaGFzaG1hcC5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS0xLy4vc3JjL2xpbmtlZExpc3RzLmpzIiwid2VicGFjazovL3RlbXBsYXRlLTEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtMS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RlbXBsYXRlLTEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90ZW1wbGF0ZS0xLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpbmtlZExpc3QgfSBmcm9tIFwiLi9saW5rZWRMaXN0c1wiO1xuXG5jbGFzcyBIYXNoTWFwIHtcbiAgY29uc3RydWN0b3IobWF4TG9hZEZhY3RvciA9IDAuNzUpIHtcbiAgICB0aGlzLm1heEJ1Y2tldHMgPSAxNjtcbiAgICB0aGlzLmJ1Y2tldEdyb3d0aE11bHRpcGxpZXIgPSAyO1xuICAgIHRoaXMubWF4TG9hZEZhY3RvciA9IG1heExvYWRGYWN0b3I7XG4gICAgdGhpcy5jYXBhY2l0eSA9IDA7XG4gICAgdGhpcy5idWNrZXRzID0gW107XG4gIH1cblxuICBoYXNoKGtleSkge1xuICAgIGxldCBoYXNoQ29kZSA9IDA7XG5cbiAgICBjb25zdCBwcmltZU51bWJlciA9IDMxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBoYXNoQ29kZSA9IChwcmltZU51bWJlciAqIGhhc2hDb2RlICsga2V5LmNoYXJDb2RlQXQoaSkpICUgdGhpcy5tYXhCdWNrZXRzO1xuICAgIH1cblxuICAgIHJldHVybiBoYXNoQ29kZTtcbiAgfVxuXG4gIHNldChrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5jYXBhY2l0eSA9IHRoaXMuZ2V0TnVtYmVyT2ZCdWNrZXRzKCk7XG5cbiAgICBpZiAodGhpcy5jYXBhY2l0eSA+PSB0aGlzLm1heExvYWRGYWN0b3IgKiB0aGlzLm1heEJ1Y2tldHMpIHtcbiAgICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmVudHJpZXMoKTtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMubWF4QnVja2V0cyA9IHRoaXMubWF4QnVja2V0cyAqIHRoaXMuYnVja2V0R3Jvd3RoTXVsdGlwbGllcjtcbiAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc2hDb2RlID0gdGhpcy5oYXNoKGtleSk7XG5cbiAgICBpZiAoIXRoaXMuYnVja2V0c1toYXNoQ29kZV0pIHtcbiAgICAgIHRoaXMuYnVja2V0c1toYXNoQ29kZV0gPSBuZXcgTGlua2VkTGlzdCgpO1xuICAgICAgdGhpcy5idWNrZXRzW2hhc2hDb2RlXS5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhhcyhrZXkpKSB7XG4gICAgICB0aGlzLmJ1Y2tldHNbaGFzaENvZGVdLnVwZGF0ZVZhbHVlR2l2ZW5LZXkoa2V5LCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVja2V0c1toYXNoQ29kZV0uYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldChrZXkpIHtcbiAgICBjb25zdCBoYXNoQ29kZSA9IHRoaXMuaGFzaChrZXkpO1xuICAgIGNvbnN0IGN1cnJlbnRCdWNrZXQgPSB0aGlzLmJ1Y2tldHNbaGFzaENvZGVdO1xuXG4gICAgaWYgKCFjdXJyZW50QnVja2V0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN1cnJlbnRCdWNrZXQuZmluZFZhbHVlR2l2ZW5LZXkoa2V5KTtcbiAgICB9XG4gIH1cblxuICBoYXMoa2V5KSB7XG4gICAgY29uc3QgaGFzaENvZGUgPSB0aGlzLmhhc2goa2V5KTtcbiAgICBjb25zdCBjdXJyZW50QnVja2V0ID0gdGhpcy5idWNrZXRzW2hhc2hDb2RlXTtcblxuICAgIGlmICghY3VycmVudEJ1Y2tldCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3VycmVudEJ1Y2tldC5jb250YWluc0tleShrZXkpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZShrZXkpIHtcbiAgICBjb25zdCBoYXNoQ29kZSA9IHRoaXMuaGFzaChrZXkpO1xuICAgIGNvbnN0IGN1cnJlbnRCdWNrZXQgPSB0aGlzLmJ1Y2tldHNbaGFzaENvZGVdO1xuXG4gICAgaWYgKCFjdXJyZW50QnVja2V0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY3VycmVudEJ1Y2tldC5maW5kS2V5KGtleSk7XG4gICAgICB0aGlzLmNhcGFjaXR5ID0gdGhpcy5nZXROdW1iZXJPZkJ1Y2tldHMoKTtcbiAgICAgIHJldHVybiBjdXJyZW50QnVja2V0LnJlbW92ZUF0KGluZGV4KTtcbiAgICB9XG4gIH1cblxuICBnZXROdW1iZXJPZkJ1Y2tldHMoKSB7XG4gICAgbGV0IHRvdGFsQnVja2V0cyA9IDA7XG5cbiAgICB0aGlzLmJ1Y2tldHMuZm9yRWFjaCgoYnVja2V0KSA9PiB7XG4gICAgICBpZiAoYnVja2V0KSB7XG4gICAgICAgIGlmIChidWNrZXQuc2l6ZSgpID4gMCkge1xuICAgICAgICAgIHRvdGFsQnVja2V0cysrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvdGFsQnVja2V0cztcbiAgfVxuXG4gIGxlbmd0aCgpIHtcbiAgICBsZXQgbnVtYmVyT2ZLZXlzID0gMDtcblxuICAgIHRoaXMuYnVja2V0cy5mb3JFYWNoKChidWNrZXQpID0+IHtcbiAgICAgIGNvbnN0IGJ1Y2tldFNpemUgPSBidWNrZXQuc2l6ZSgpO1xuICAgICAgbnVtYmVyT2ZLZXlzICs9IGJ1Y2tldFNpemU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbnVtYmVyT2ZLZXlzO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5idWNrZXRzID0gW107XG4gIH1cblxuICBrZXlzKCkge1xuICAgIGxldCBhbGxLZXlzID0gW107XG5cbiAgICB0aGlzLmJ1Y2tldHMuZm9yRWFjaCgoYnVja2V0KSA9PiB7XG4gICAgICBjb25zdCB0aGlzQnVja2V0c0tleXMgPSBidWNrZXQubGlzdEtleXMoKTtcbiAgICAgIGlmICh0aGlzQnVja2V0c0tleXMpIHtcbiAgICAgICAgYWxsS2V5cyA9IGFsbEtleXMuY29uY2F0KHRoaXNCdWNrZXRzS2V5cyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYWxsS2V5cztcbiAgfVxuXG4gIHZhbHVlcygpIHtcbiAgICBsZXQgYWxsVmFsdWVzID0gW107XG5cbiAgICB0aGlzLmJ1Y2tldHMuZm9yRWFjaCgoYnVja2V0KSA9PiB7XG4gICAgICBjb25zdCB0aGlzQnVja2V0c1ZhbHVlcyA9IGJ1Y2tldC5saXN0VmFsdWVzKCk7XG4gICAgICBpZiAodGhpc0J1Y2tldHNWYWx1ZXMpIHtcbiAgICAgICAgYWxsVmFsdWVzID0gYWxsVmFsdWVzLmNvbmNhdCh0aGlzQnVja2V0c1ZhbHVlcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYWxsVmFsdWVzO1xuICB9XG5cbiAgZW50cmllcygpIHtcbiAgICBsZXQgYWxsRW50cmllcyA9IFtdO1xuXG4gICAgdGhpcy5idWNrZXRzLmZvckVhY2goKGJ1Y2tldCkgPT4ge1xuICAgICAgY29uc3QgdGhpc0J1Y2tldHNFbnRyaWVzID0gYnVja2V0Lmxpc3RFbnRyaWVzKCk7XG4gICAgICBpZiAodGhpc0J1Y2tldHNFbnRyaWVzKSB7XG4gICAgICAgIGFsbEVudHJpZXMgPSBhbGxFbnRyaWVzLmNvbmNhdCh0aGlzQnVja2V0c0VudHJpZXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGFsbEVudHJpZXM7XG4gIH1cbn1cblxuZXhwb3J0IHsgSGFzaE1hcCB9O1xuIiwiY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKGtleSA9IG51bGwsIHZhbHVlID0gbnVsbCkge1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLm5leHROb2RlID0gbnVsbDtcbiAgfVxufVxuXG5jbGFzcyBMaW5rZWRMaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oZWFkID0gbnVsbDtcbiAgfVxuXG4gIGFwcGVuZChrZXksIHZhbHVlKSB7XG4gICAgY29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKGtleSwgdmFsdWUpO1xuICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcblxuICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5oZWFkID0gbmV3Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlLm5leHROb2RlKSB7XG4gICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dE5vZGU7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnROb2RlLm5leHROb2RlID0gbmV3Tm9kZTtcbiAgICB9XG4gIH1cblxuICBwcmVwZW5kKGtleSwgdmFsdWUpIHtcbiAgICBjb25zdCBuZXdOb2RlID0gbmV3IE5vZGUoa2V5LCB2YWx1ZSk7XG4gICAgbmV3Tm9kZS5uZXh0Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICB0aGlzLmhlYWQgPSBuZXdOb2RlO1xuICB9XG5cbiAgc2l6ZSgpIHtcbiAgICBsZXQgY291bnRlciA9IDA7XG4gICAgbGV0IGN1cnJlbnROb2RlID0gdGhpcy5oZWFkO1xuXG4gICAgd2hpbGUgKGN1cnJlbnROb2RlKSB7XG4gICAgICBjb3VudGVyKys7XG4gICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHROb2RlO1xuICAgIH1cblxuICAgIHJldHVybiBjb3VudGVyO1xuICB9XG5cbiAgaGVhZE5vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGVhZCA9PT0gbnVsbCA/IG51bGwgOiB0aGlzLmhlYWQudmFsdWU7XG4gIH1cblxuICB0YWlsTm9kZSgpIHtcbiAgICBsZXQgY3VycmVudE5vZGUgPSB0aGlzLmhlYWQ7XG5cbiAgICBpZiAoY3VycmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAoY3VycmVudE5vZGUubmV4dE5vZGUpIHtcbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0Tm9kZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcbiAgICB9XG4gIH1cblxuICBhdChpbmRleCkge1xuICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICBpZiAoY3VycmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGluZGV4OyBpKyspIHtcbiAgICAgIGlmIChpID09PSBpbmRleCkge1xuICAgICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgICB9IGVsc2UgaWYgKCFjdXJyZW50Tm9kZS5uZXh0Tm9kZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dE5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcG9wKCkge1xuICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gbnVsbDtcblxuICAgIGlmIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlLm5leHROb2RlKSB7XG4gICAgICAgIHByZXZpb3VzTm9kZSA9IGN1cnJlbnROb2RlO1xuICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHROb2RlO1xuICAgICAgfVxuXG4gICAgICBwcmV2aW91c05vZGUubmV4dE5vZGUgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRWYWx1ZUdpdmVuS2V5KGtleSkge1xuICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICBsZXQgdmFsdWUgPSBudWxsO1xuXG4gICAgaWYgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICBkbyB7XG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS5rZXkgPT09IGtleSkge1xuICAgICAgICAgIHZhbHVlID0gY3VycmVudE5vZGUudmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0Tm9kZTtcbiAgICAgIH0gd2hpbGUgKGN1cnJlbnROb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgdXBkYXRlVmFsdWVHaXZlbktleShrZXksIHZhbHVlKSB7XG4gICAgbGV0IGN1cnJlbnROb2RlID0gdGhpcy5oZWFkO1xuXG4gICAgaWYgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICBkbyB7XG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS5rZXkgPT09IGtleSkge1xuICAgICAgICAgIGN1cnJlbnROb2RlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0Tm9kZTtcbiAgICAgIH0gd2hpbGUgKGN1cnJlbnROb2RlKTtcbiAgICB9XG4gIH1cblxuICBmaW5kS2V5KGtleSkge1xuICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICBsZXQgY29udGFpbnMgPSBmYWxzZTtcbiAgICBsZXQgaW5kZXggPSBudWxsO1xuXG4gICAgaWYgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICBpbmRleCA9IC0xO1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICYmICFjb250YWlucykge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICBpZiAoY3VycmVudE5vZGUua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICBjb250YWlucyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0Tm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbnRhaW5zID09PSBmYWxzZSA/IG51bGwgOiBpbmRleDtcbiAgfVxuXG4gIGNvbnRhaW5zS2V5KGtleSkge1xuICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICBsZXQgY29udGFpbnMgPSBmYWxzZTtcblxuICAgIGlmIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgZG8ge1xuICAgICAgICBpZiAoY3VycmVudE5vZGUua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICBjb250YWlucyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0Tm9kZTtcbiAgICAgIH0gd2hpbGUgKGN1cnJlbnROb2RlKTtcbiAgICAgIHJldHVybiBjb250YWlucztcbiAgICB9XG4gIH1cblxuICBsaXN0S2V5cygpIHtcbiAgICBsZXQgY3VycmVudE5vZGUgPSB0aGlzLmhlYWQ7XG4gICAgbGV0IGtleXMgPSBbXTtcblxuICAgIGlmIChjdXJyZW50Tm9kZSkge1xuICAgICAgZG8ge1xuICAgICAgICBrZXlzLnB1c2goY3VycmVudE5vZGUua2V5KTtcbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0Tm9kZTtcbiAgICAgIH0gd2hpbGUgKGN1cnJlbnROb2RlKTtcbiAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cbiAgfVxuXG4gIGNvbnRhaW5zVmFsdWUodmFsdWUpIHtcbiAgICBsZXQgY3VycmVudE5vZGUgPSB0aGlzLmhlYWQ7XG4gICAgbGV0IGNvbnRhaW5zID0gZmFsc2U7XG5cbiAgICBpZiAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgIGNvbnRhaW5zID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHROb2RlO1xuICAgICAgfSB3aGlsZSAoY3VycmVudE5vZGUpO1xuICAgICAgcmV0dXJuIGNvbnRhaW5zO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRWYWx1ZSh2YWx1ZSkge1xuICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICBsZXQgY29udGFpbnMgPSBmYWxzZTtcbiAgICBsZXQgaW5kZXggPSBudWxsO1xuXG4gICAgaWYgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICBpbmRleCA9IC0xO1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICYmICFjb250YWlucykge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICBpZiAoY3VycmVudE5vZGUudmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgY29udGFpbnMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dE5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb250YWlucyA9PT0gZmFsc2UgPyBudWxsIDogaW5kZXg7XG4gIH1cblxuICBsaXN0VmFsdWVzKCkge1xuICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICBsZXQgdmFsdWVzID0gW107XG5cbiAgICBpZiAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgdmFsdWVzLnB1c2goY3VycmVudE5vZGUudmFsdWUpO1xuICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHROb2RlO1xuICAgICAgfSB3aGlsZSAoY3VycmVudE5vZGUpO1xuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG4gIH1cblxuICBsaXN0RW50cmllcygpIHtcbiAgICBsZXQgY3VycmVudE5vZGUgPSB0aGlzLmhlYWQ7XG4gICAgbGV0IGVudHJpZXMgPSBbXTtcblxuICAgIGlmIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgZG8ge1xuICAgICAgICBlbnRyaWVzLnB1c2goW2N1cnJlbnROb2RlLmtleSwgY3VycmVudE5vZGUudmFsdWVdKTtcbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0Tm9kZTtcbiAgICAgIH0gd2hpbGUgKGN1cnJlbnROb2RlKTtcbiAgICAgIHJldHVybiBlbnRyaWVzO1xuICAgIH1cbiAgfVxuXG4gIGluc2VydEF0KGtleSwgdmFsdWUsIGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICB0aGlzLnByZXBlbmQodmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuYXQoaW5kZXgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKGtleSwgdmFsdWUpO1xuICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gbnVsbDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGluZGV4OyBpKyspIHtcbiAgICAgIGlmIChpID09PSBpbmRleCkge1xuICAgICAgICBjb25zb2xlLmxvZyhwcmV2aW91c05vZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50Tm9kZSk7XG4gICAgICAgIHByZXZpb3VzTm9kZS5uZXh0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIG5ld05vZGUubmV4dE5vZGUgPSBjdXJyZW50Tm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByZXZpb3VzTm9kZSA9IGN1cnJlbnROb2RlO1xuICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHROb2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0KGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLmF0KGluZGV4KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gbnVsbDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGluZGV4OyBpKyspIHtcbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICB0aGlzLmhlYWQgPSBjdXJyZW50Tm9kZS5uZXh0Tm9kZTtcbiAgICAgIH0gZWxzZSBpZiAoaSA9PT0gaW5kZXgpIHtcbiAgICAgICAgcHJldmlvdXNOb2RlLm5leHROb2RlID0gY3VycmVudE5vZGUubmV4dE5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2aW91c05vZGUgPSBjdXJyZW50Tm9kZTtcbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0Tm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBsZXQgc3RyaW5nID0gXCJcIjtcbiAgICBsZXQgY3VycmVudE5vZGUgPSB0aGlzLmhlYWQ7XG5cbiAgICBkbyB7XG4gICAgICBpZiAoY3VycmVudE5vZGUpIHtcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nICsgYCggJHtjdXJyZW50Tm9kZS5rZXl9OiAke2N1cnJlbnROb2RlLnZhbHVlfSApYDtcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nICsgXCIgLT4gXCI7XG4gICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dE5vZGU7XG4gICAgICB9XG4gICAgICBpZiAoIWN1cnJlbnROb2RlKSB7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZyArIGAoIG51bGwgKWA7XG4gICAgICB9XG4gICAgfSB3aGlsZSAoY3VycmVudE5vZGUpO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxufVxuXG5leHBvcnQgeyBMaW5rZWRMaXN0IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEhhc2hNYXAgfSBmcm9tIFwiLi9oYXNobWFwLmpzXCI7XG5cbi8vIGNvbnN0IHRlc3QgPSBuZXcgSGFzaE1hcCgpO1xuLy8gdGVzdC5zZXQoXCJIZWxsb1wiLCBcIkkgYW0gdGhlIG9sZGVzdGVzdCB2YWx1ZVwiKTtcbi8vIGNvbnNvbGUudGFibGUodGVzdC5idWNrZXRzKTtcbi8vIHRlc3Quc2V0KFwiSGVsbG9cIiwgXCJJIGFtIHRoZSBvbGRlc3Rlc3RlciB2YWx1ZVwiKTtcbi8vIGNvbnNvbGUudGFibGUodGVzdC5idWNrZXRzKTtcbi8vIHRlc3Quc2V0KFwiQ2FybG9zc3Nzc1wiLCBcIkkgYW0gdGhlIG9sZGVzdCB2YWx1ZVwiKTtcbi8vIGNvbnNvbGUudGFibGUodGVzdC5idWNrZXRzKTtcbi8vIHRlc3Quc2V0KFwiQ2FybG9zc1wiLCBcIkkgYW0gdGhlIG9sZCB2YWx1ZVwiKTtcbi8vIGNvbnNvbGUudGFibGUodGVzdC5idWNrZXRzKTtcbi8vIHRlc3Quc2V0KFwiQ2FybG9zXCIsIFwiSSBhbSB0aGUgbmV3IHZhbHVlXCIpO1xuLy8gY29uc29sZS50YWJsZSh0ZXN0LmJ1Y2tldHMpO1xuLy8gY29uc29sZS5sb2codGVzdC5nZXQoXCJDYXJsb3Nzc3NzXCIpKTtcbi8vIGNvbnNvbGUubG9nKHRlc3QuaGFzKFwiQ2FybG9zXCIpKTtcbi8vIC8vIGNvbnNvbGUubG9nKHRlc3QucmVtb3ZlKFwiQ2FybG9zc3Nzc1wiKSk7XG4vLyAvLyBjb25zb2xlLnRhYmxlKHRlc3QuYnVja2V0cyk7XG4vLyBjb25zb2xlLmxvZyh0ZXN0Lmxlbmd0aCgpKTtcbi8vIC8vIHRlc3QuY2xlYXIoKTtcbi8vIC8vIGNvbnNvbGUubG9nKHRlc3QuYnVja2V0cyk7XG4vLyBjb25zb2xlLmxvZyh0ZXN0LmtleXMoKSk7XG4vLyBjb25zb2xlLmxvZyh0ZXN0LnZhbHVlcygpKTtcbi8vIGNvbnNvbGUubG9nKHRlc3QuZW50cmllcygpKTtcbi8vIGNvbnNvbGUubG9nKHRlc3QuZ2V0TnVtYmVyT2ZCdWNrZXRzKCkpO1xuXG4vLyBPZGluIHRlc3RcbmNvbnN0IHRlc3QgPSBuZXcgSGFzaE1hcCgpOyAvLyBvciBIYXNoTWFwKCkgaWYgdXNpbmcgYSBmYWN0b3J5XG50ZXN0LnNldChcImFwcGxlXCIsIFwicmVkXCIpO1xudGVzdC5zZXQoXCJiYW5hbmFcIiwgXCJ5ZWxsb3dcIik7XG50ZXN0LnNldChcImNhcnJvdFwiLCBcIm9yYW5nZVwiKTtcbnRlc3Quc2V0KFwiZG9nXCIsIFwiYnJvd25cIik7XG50ZXN0LnNldChcImVsZXBoYW50XCIsIFwiZ3JheVwiKTtcbnRlc3Quc2V0KFwiZnJvZ1wiLCBcImdyZWVuXCIpO1xudGVzdC5zZXQoXCJncmFwZVwiLCBcInB1cnBsZVwiKTtcbnRlc3Quc2V0KFwiaGF0XCIsIFwiYmxhY2tcIik7XG50ZXN0LnNldChcImljZSBjcmVhbVwiLCBcIndoaXRlXCIpO1xudGVzdC5zZXQoXCJqYWNrZXRcIiwgXCJibHVlXCIpO1xudGVzdC5zZXQoXCJraXRlXCIsIFwicGlua1wiKTtcbnRlc3Quc2V0KFwibGlvblwiLCBcImdvbGRlblwiKTtcbnRlc3Quc2V0KFwicG9wc2ljbGVcIiwgXCJncmVlblwiKTtcbnRlc3Quc2V0KFwiY29hdFwiLCBcIm9yYW5nZVwiKTtcbnRlc3Quc2V0KFwiZmlzaFwiLCBcInNwb3R0ZWRcIik7XG50ZXN0LnNldChcInplYnJhc1wiLCBcInN0cmlwZWRcIik7XG50ZXN0LnNldChcImZpc2hpZXNcIiwgXCJtYW55XCIpO1xudGVzdC5zZXQoXCJ3aGFsZVwiLCBcImJpZ1wiKTtcblxuY29uc29sZS50YWJsZSh0ZXN0KTtcbmNvbnNvbGUudGFibGUodGVzdC5lbnRyaWVzKCkpO1xudGVzdC5zZXQoXCJhcHBsZVwiLCBcIm5vdCByZWRcIik7XG5jb25zb2xlLnRhYmxlKHRlc3QuZW50cmllcygpKTtcblxudGVzdC5zZXQoXCJtb29uXCIsIFwic2lsdmVyXCIpO1xuY29uc29sZS50YWJsZSh0ZXN0KTtcbmNvbnNvbGUudGFibGUodGVzdC5lbnRyaWVzKCkpO1xuXG50ZXN0LnNldChcInBvcHNpY2xlXCIsIFwibm90IGdyZWVuXCIpO1xudGVzdC5zZXQoXCJjb2F0XCIsIFwibm90IG9yYW5nZVwiKTtcbnRlc3Quc2V0KFwiZmlzaFwiLCBcIm5vdCBzcG90dGVkXCIpO1xuY29uc29sZS50YWJsZSh0ZXN0LmVudHJpZXMoKSk7XG5cbmNvbnNvbGUubG9nKHRlc3QuZ2V0KFwiY29hdFwiKSk7XG5jb25zb2xlLmxvZyh0ZXN0LmhhcyhcImNvYXRzXCIpKTtcbmNvbnNvbGUubG9nKHRlc3QucmVtb3ZlKFwibW9vblwiKSk7XG5jb25zb2xlLnRhYmxlKHRlc3QpO1xuY29uc29sZS50YWJsZSh0ZXN0LmVudHJpZXMoKSk7XG5jb25zb2xlLmxvZyh0ZXN0LnJlbW92ZShcIm1vb25cIikpO1xuY29uc29sZS50YWJsZSh0ZXN0KTtcbmNvbnNvbGUudGFibGUodGVzdC5lbnRyaWVzKCkpO1xuY29uc29sZS5sb2codGVzdC5sZW5ndGgoKSk7XG5jb25zb2xlLmxvZyh0ZXN0LmtleXMoKSk7XG5jb25zb2xlLmxvZyh0ZXN0LnZhbHVlcygpKTtcbmNvbnNvbGUubG9nKHRlc3QuZW50cmllcygpKTtcbiJdLCJuYW1lcyI6WyJMaW5rZWRMaXN0IiwiSGFzaE1hcCIsImNvbnN0cnVjdG9yIiwibWF4TG9hZEZhY3RvciIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm1heEJ1Y2tldHMiLCJidWNrZXRHcm93dGhNdWx0aXBsaWVyIiwiY2FwYWNpdHkiLCJidWNrZXRzIiwiaGFzaCIsImtleSIsImhhc2hDb2RlIiwicHJpbWVOdW1iZXIiLCJpIiwiY2hhckNvZGVBdCIsInNldCIsInZhbHVlIiwiZ2V0TnVtYmVyT2ZCdWNrZXRzIiwiZW50cmllcyIsImNsZWFyIiwiZm9yRWFjaCIsImVudHJ5IiwiYXBwZW5kIiwiaGFzIiwidXBkYXRlVmFsdWVHaXZlbktleSIsImdldCIsImN1cnJlbnRCdWNrZXQiLCJmaW5kVmFsdWVHaXZlbktleSIsImNvbnRhaW5zS2V5IiwicmVtb3ZlIiwiaW5kZXgiLCJmaW5kS2V5IiwicmVtb3ZlQXQiLCJ0b3RhbEJ1Y2tldHMiLCJidWNrZXQiLCJzaXplIiwibnVtYmVyT2ZLZXlzIiwiYnVja2V0U2l6ZSIsImtleXMiLCJhbGxLZXlzIiwidGhpc0J1Y2tldHNLZXlzIiwibGlzdEtleXMiLCJjb25jYXQiLCJ2YWx1ZXMiLCJhbGxWYWx1ZXMiLCJ0aGlzQnVja2V0c1ZhbHVlcyIsImxpc3RWYWx1ZXMiLCJhbGxFbnRyaWVzIiwidGhpc0J1Y2tldHNFbnRyaWVzIiwibGlzdEVudHJpZXMiLCJOb2RlIiwibmV4dE5vZGUiLCJoZWFkIiwibmV3Tm9kZSIsImN1cnJlbnROb2RlIiwicHJlcGVuZCIsImNvdW50ZXIiLCJoZWFkTm9kZSIsInRhaWxOb2RlIiwiYXQiLCJwb3AiLCJwcmV2aW91c05vZGUiLCJjb250YWlucyIsInB1c2giLCJjb250YWluc1ZhbHVlIiwiZmluZFZhbHVlIiwiaW5zZXJ0QXQiLCJjb25zb2xlIiwibG9nIiwidG9TdHJpbmciLCJzdHJpbmciLCJ0ZXN0IiwidGFibGUiXSwic291cmNlUm9vdCI6IiJ9