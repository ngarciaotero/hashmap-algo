export function node(initialKey, initialValue) {
  let key = initialKey;
  let value = initialValue;
  let next = null;

  function getKey() {
    return key;
  }

  function getValue() {
    return value;
  }

  function getNext() {
    return next;
  }

  function setValue(newValue) {
    value = newValue;
  }

  function setNext(nextNode) {
    next = nextNode;
  }

  return {
    getKey,
    getValue,
    getNext,
    setValue,
    setNext,
  };
}
