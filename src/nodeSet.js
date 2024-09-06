export function node(initialKey) {
  let key = initialKey;
  let next = null;

  function getKey() {
    return key;
  }

  function getNext() {
    return next;
  }

  function setNext(nextNode) {
    next = nextNode;
  }

  return {
    getKey,
    getNext,
    setNext,
  };
}
