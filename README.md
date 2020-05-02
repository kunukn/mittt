> Forked from https://github.com/developit/mitt<br/>
> New project created from TSDX CLI.

# Mittt

> Tiny functional event emitter / pubsub.

- **Microscopic:** weighs less than 300 bytes gzipped
- **Useful:** a wildcard `"*"` event type listens to all events
- **Useful:** a wildcard `"*"` event type emit invokes all unique registered handlers
- **Useful:** a wildcard `"**"` event type emit invoke all registered handlers
- **Functional:** methods don't rely on `this`
- **Great Name:** somehow [mittt](https://npm.im/mittt) wasn't taken

Mittt was made for the browser, but works in any JavaScript runtime. It has no dependencies and supports IE11+.

## Table of Contents

- [Install](#install)
- [Usage](#usage)

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ npm install mittt
# or
# yarn add mittt
```

Then with a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/), use as you would anything else:

```javascript
// using ES6 modules
import mittt from 'mittt';

// using CommonJS modules
var mittt = require('mittt');
```

The [ESM](https://jakearchibald.com/2017/es-modules-in-browsers/) build is also available on [unpkg](https://unpkg.com):

```html
<script type="module" src="https://unpkg.com/mittt/dist/mittt.esm.js"></script>
```

## Usage

```js
import mittt from 'mittt';

const emitter = mittt();

function onEvent(eventType, payload) {
  console.log(eventType, payload);
}

// listen to an event
emitter.on('foo', onEvent);

// listen to all events
emitter.on('*', onEvent);

// fire an event
emitter.emit('foo');

// fire an event with payload
const payload = { a: 'b' };
emitter.emit('bar', payload);

// fire all unique registered handlers with payload
// payload is optional
emitter.emit('*', payload);

// fire all registered handlers with payload
// payload is optional
emitter.emit('**', payload);

// working with handler references:
emitter.on('foo', onEvent); // listen
emitter.off('foo', onEvent); // unlisten
```

### TypeScript

```ts
import mittt, { Emitter } from 'mittt';
const emitter: Emitter = mittt();
```
