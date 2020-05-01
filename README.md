> Forked from https://github.com/developit/mitt<br/>
> New project created from TSDX CLI.

# Mittt

> Tiny functional event emitter / pubsub.

- **Microscopic:** weighs less than 300 bytes gzipped
- **Useful:** a wildcard `"*"` event type listens to all events

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

// fire an event with payload
const payload = { a: 'b' };
emitter.emit('foo', payload);

// fire an event without payload
emitter.emit('bar');

// fire all registered events with payload
emitter.emit('*', payload);

// working with handler references:
emitter.on('foo', onEvent); // listen
emitter.off('foo', onEvent); // unlisten
```

### TypeScript

```ts
import mittt, { Emitter } from 'mittt';
const emitter: Emitter = mittt();
```
