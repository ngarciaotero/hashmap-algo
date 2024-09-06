# Hash Map Algorithm

This project implements a hash pap data structure in JavaScript, along with hash set implementation. The project contains several modules that work together to create hash-based data structures.

## Usage

To use the hash map:

```bash
import { hashMap } from './hashMapFactory.js';

const map = hashMap();
map.set('key', 'value');
console.log(map.get('key')); // Output: 'value'
```

To use the hash set:

```bash
import { hashSet } from './hashSetFactory.js';

const set = hashSet();
set.set('key');
console.log(set.has('key')); // Output: true
```

To run application:

```bash
npm start
```
