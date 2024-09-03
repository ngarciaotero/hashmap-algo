export function hashMap() {
  let buckets = Array.from({ length: 16 }, () => []);

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= buckets.length;
    }
    return hashCode;
  }
  return { hash };
}
