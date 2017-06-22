# ObjFP

A library dedicated to functional-esque programming methods for JavaScript objects.

`npm install objfp`

```javascript
const ObjFP = require('objfp');
```

&nbsp;

## Methods

**ObjFP.map()**

The *ObjFP.map()* method accepts an object reference and a callback, and returns a new object with the same property keys, but with values equal to the transformation applied via the supplied callback. This is a pure function, so the original object is not mutated. This works similar to JavaScript's *Array.prototype.map()* method. 

*Method signature:*

```javascript
ObjFP.map(obj, callback)
```

*Method parameters:*

* **obj** - a JavaScript object with at least one property
* **callback** - a function that will determine the transformation to be applied to each property value 

*Callback signature:*

```javascript
fn(value[, key, index, origObjRef])
```

*Callback parameters:*

* **value** - the value of the property to be transformed
* **key** *(optional)* - the key of the property currently being iterated over
* **index** *(optional)* - the index number of the key currently being iterated over (*Object.keys()* is utilized)
* **origObjRef** *(optional)* - a reference to the original object

*Example:*

```javascript
// original object reference
let obj = {a: 1, b: 2, c: 3};

// create new object with transformation
let newObj = ObjFP.map(obj, val => val * 2);

console.log(newObj); // {a: 2, b: 4, c: 6}
console.log(obj); // {a: 1, b: 2, c: 3}
```

&nbsp;

---

**ObjFP.filter()**

The *ObjFP.filter()* method accepts an object reference and a callback, and returns a new object with property keys determined by the result of the supplied callback's evaluation. This is a pure function, so the original object is not mutated. This works similar to JavaScript's *Array.prototype.filter()* method. 

*Method signature:*
```javascript
ObjFP.filter(obj, callback)
```

*Method parameters:*

* **obj** - a JavaScript object with at least one property
* **callback** - a function that will determine which properties to keep/remove

*Callback signature:*
```javascript
fn(value[, key, index, origObjRef])
```

*Callback parameters:*

* **value** - the value of the property currently being evaluated
* **key** *(optional)* - the key of the property currently being iterated over 
* **index** *(optional)* - the index number of the key currently being iterated over (*Object.keys()* is utilized)
* **origObjRef** *(optional)* - a reference to the original object

*Example:*

```javascript
// original object reference
let obj = {a: 1, b: 2, c: 3, d: 4};

// create new object with transformation
let newObj = ObjFP.filter(obj, val => val > 2);

console.log(newObj); // {c: 3, d: 4}
console.log(obj); // {a: 1, b: 2, c: 3, d: 4}
```

&nbsp;

---

**ObjFP.reduce()**

The *ObjFP.reduce()* method accepts an object reference and a callback (and an optional initial value), and returns a single accumulated value based on the transformation applied by the callback function. This is a pure function, so the original object is not mutated. This works similar to JavaScript's *Array.prototype.reduce()* method. 

*Method signature:*
```javascript
ObjFP.reduce(obj, callback[, initialValue])
```

*Method parameters:*

* **obj** - a JavaScript object with at least two properties (or one property if initialValue supplied)
* **callback** - a function that will determine how to accumulate the final value
* **initialValue** *(optional)* - the value with which the accumulator starts (if not supplied, will be the first property in the original object reference)

*Callback signature:*
```javascript
fn(accumulator, currentValue[, currentIndex, origObjRef])
```

*Callback parameters:*

* **accumulator** - the accumulated value in the last invocation of the callback (or initialValue, if supplied)
* **currentValue** - the current object property being iterated over
* **currentIndex** *(optional)* - the index number of the key currently being iterated over (*Object.keys()* is utilized)
* **origObjRef** *(optional)* - a reference to the original object

*Example:*

```javascript
// original object reference
let obj = {a: 1, b: 2, c: 3, d: 4};

// create an accumulated value, providing an initial value
let result = ObjFP.reduce(obj, (acc, curr) => acc + curr, 10);

console.log(result); // 20
console.log(obj); // {a: 1, b: 2, c: 3, d: 4}
```

&nbsp;

---

**Chaining ObjFP Methods**

The *ObjFP.map()*, *.filter()*, and *.reduce()* methods can be chained together without the need for nesting or creating separate values from multiple function calls.

Aside from the *.reduce()* method, which only returns a single value, the *.map()* and *.filter()* functions return a new object with all three methods accessible on the object itself. The difference between these methods and the original methods is that the ones present on the return object need only the callback passed in as a single argument (the *initialValue* parameter is also available for *.reduce()*).

*Example:*

```javascript
// original object reference
let obj = {a: 1, b: 2, c: 3, d: 4};

// create an accumulated value using all three methods, providing an initial value for the reduce() method
let result = ObjFP.map(obj, val => val * 2)
				  .filter(val => val > 4)
                  .reduce((acc, curr) => acc + curr, 10);

console.log(result); // 24
console.log(obj); // {a: 1, b: 2, c: 3, d: 4};
```

&nbsp;
