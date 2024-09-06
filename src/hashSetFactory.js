import { linkedList } from "./linkedListSet.js";

export function hashSet() {
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

  function set(key) {
    const index = hash(key);
    const bucket = buckets[index];
    if (bucket.contains(key)) {
      return;
    } else {
      bucket.append(key);
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
        newBuckets[newIndex].append(current.getKey());
        current = current.getNext();
      }
    });
    buckets = newBuckets;
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

  function entries() {
    const allEntries = [];
    buckets.forEach((bucket) => {
      let current = bucket.getHead();
      while (current) {
        allEntries.push(`[${current.getKey()}]`);
        current = current.getNext();
      }
    });
    return allEntries;
  }

  return { set, has, remove, length, clear, keys, entries };
}
