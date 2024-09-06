import { node } from "./node.js";

export function linkedList() {
  let head = null;
  let tail = null;
  let size = 0;

  // add node to end of list
  function append(key, value) {
    const newNode = node(key, value);
    if (tail) {
      tail.setNext(newNode);
    } else {
      head = newNode;
    }
    tail = newNode;
    size++;
  }

  // add node to start of list
  function prepend(key, value) {
    const newNode = node(key, value);
    if (head) {
      newNode.setNext(head);
    } else {
      tail = newNode;
    }
    head = newNode;
    size++;
  }

  // get list length
  function getSize() {
    return size;
  }

  // get first node
  function getHead() {
    return head;
  }

  // get node at given index
  function at(index) {
    if (index >= size || index < 0) return null;

    let currentNode = head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.getNext();
    }
    return currentNode;
  }

  // remove last node
  function pop() {
    if (size === 0) return;

    if (size === 1) {
      head = null;
      tail = null;
    } else {
      let secondToLast = at(size - 2);
      secondToLast.setNext(null);
      tail = secondToLast;
    }
    size--;
  }

  // remove first node
  function shift() {
    if (size === 0) return;

    head = head.getNext();
    if (size === 1) {
      tail = null;
    }
    size--;
  }

  // checks if value exists
  function contains(key) {
    let currentNode = head;
    while (currentNode) {
      if (currentNode.getKey() === key) {
        return true;
      }
      currentNode = currentNode.getNext();
    }
    return false;
  }

  // gets the index of found value
  function find(key) {
    let currentNode = head;
    let i = 0;
    while (currentNode) {
      if (currentNode.getKey() === key) {
        return i;
      }
      currentNode = currentNode.getNext();
      i++;
    }
    return null;
  }

  // remove value at given index
  function removeAt(index) {
    if (index === 0) {
      shift();
    } else if (index === getSize() - 1) {
      pop();
    } else {
      let previousNode = at(index - 1);
      let removeNode = previousNode.getNext();
      previousNode.setNext(removeNode.getNext());
      size--;
    }
  }

  // update value of given node
  function updateValue(key, newValue) {
    const index = find(key);
    if (index !== null) {
      const node = at(index);
      node.setValue(newValue);
    }
  }

  return {
    append,
    prepend,
    getSize,
    getHead,
    at,
    pop,
    shift,
    contains,
    find,
    removeAt,
    updateValue,
  };
}
