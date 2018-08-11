[![npm (scoped)](https://img.shields.io/npm/v/@michgonch/sure.svg)](https://github.com/michgonch/sure)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@michgonch/sure.svg)](https://github.com/michgonch/sure)

# Sure

Promise implementation.

## Install

```
npm install @michgonch/sure
```

## Usage

```js
const Sure = require("./sure");

new Sure(resolve => {
  setTimeout(() => {
    resolve(`Hello, Promise!`);
  }, 1000);
}).then(msg => console.log(msg));

(async () => {
  const msg = await new Sure(resolve => {
    setTimeout(() => {
      resolve(`Hello, Async!`);
    }, 2000);
  });

  console.log(msg);
})();
```

## Inspiration

[How to make a beautiful, tiny npm package and publish it](https://medium.freecodecamp.org/how-to-make-a-beautiful-tiny-npm-package-and-publish-it-2881d4307f78)

[Write Your Own Node.js Promise Library from Scratch](https://thecodebarbarian.com/write-your-own-node-js-promise-library-from-scratch.html)

## License

MIT.
