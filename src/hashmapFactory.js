import { linkedList } from "./linkedList.js";

export function hashMap() {
  let capacity = 16;
  let size = 0;
  let buckets = Array.from({ length: capacity }, () => linkedList());

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    const keyString = String(key);
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + keyString.charCodeAt(i);
      hashCode %= capacity;
    }
    return hashCode;
  }

  function set(key, value) {
    const index = hash(key);
    const bucket = buckets[index];
    if (bucket.contains(key)) {
      bucket.updateValue(key, value);
    } else {
      bucket.append(key, value);
      size++;
      if (size > capacity * 0.75) {
        resize();
      }
    }
  }

  function resize() {
    capacity *= 2;
    const newBuckets = Array.from({ length: capacity }, () => linkedList());

    buckets.forEach((bucket) => {
      let current = bucket.getHead();
      while (current) {
        const newIndex = hash(current.getKey());
        newBuckets[newIndex].append(current.getKey(), current.getValue());
        current = current.getNext();
      }
    });
    buckets = newBuckets;
  }

  function get(key) {
    const bucketIndex = hash(key);
    const bucket = buckets[bucketIndex];
    const nodeIndex = bucket.find(key);
    return nodeIndex !== null ? bucket.at(nodeIndex).getValue() : null;
  }

  function has(key) {
    const bucketIndex = hash(key);
    const bucket = buckets[bucketIndex];
    return bucket.contains(key);
  }

  function remove(key) {
    const bucketIndex = hash(key);
    const bucket = buckets[bucketIndex];
    const nodeIndex = bucket.find(key);
    if (nodeIndex !== null) {
      bucket.removeAt(nodeIndex);
      size--;
      return true;
    }
    return false;
  }

  function length() {
    return size;
  }

  function clear() {
    buckets.forEach((bucket) => {
      let current = bucket.getHead();
      while (current) {
        bucket.shift();
        size--;
        current = current.getNext();
      }
    });
  }

  function keys() {
    const allKeys = [];
    buckets.forEach((bucket) => {
      let current = bucket.getHead();
      while (current) {
        allKeys.push(current.getKey());
        current = current.getNext();
      }
    });
    return allKeys;
  }

  function values() {
    const allValues = [];
    buckets.forEach((bucket) => {
      let current = bucket.getHead();
      while (current) {
        allValues.push(current.getValue());
        current = current.getNext();
      }
    });
    return allValues;
  }

  function entries() {
    const allEntries = [];
    buckets.forEach((bucket) => {
      let current = bucket.getHead();
      while (current) {
        allEntries.push(`[${current.getKey()}, ${current.getValue()}]`);
        current = current.getNext();
      }
    });
    return allEntries;
  }

  return { set, get, has, remove, length, clear, keys, values, entries };
}
