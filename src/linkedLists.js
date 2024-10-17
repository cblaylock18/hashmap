class Node {
  constructor(key = null, value = null) {
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

export { LinkedList };
