# Mittt

[![npm version](https://img.shields.io/npm/v/mittt.svg?style=flat-square)](https://www.npmjs.com/package/mittt)
[![npm downloads](https://img.shields.io/npm/dm/mittt.svg?style=flat-square)](https://www.npmjs.com/package/mittt)
[![gzip](https://img.shields.io/bundlephobia/minzip/mittt.svg)](https://bundlephobia.com/result?p=mittt)
[![license](https://img.shields.io/github/license/kunukn/mittt)](https://github.com/kunukn/mittt/blob/master/LICENSE)

> Tiny functional event emitter / pubsub.<br/>
> Forked from https://github.com/developit/mitt<br/>
> New project created from TSDX CLI.

- **Microscopic:** weighs <a href="https://bundlephobia.com/result?p=mittt">~300 bytes gzipped size</a>
- **Useful:** a wildcard `"*"` event type listens to all events
- **Useful:** a wildcard `"*"` emit invokes all registered handlers
- **Useful:** a wildcard `"*!"` emit invokes all unique registered handlers
- **Functional:** methods don't rely on `this`

Mittt was made for the browser, but works in any JavaScript runtime. It has no dependencies and supports IE11+.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Smallest-Install](#smallest-install)

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
npm install mittt
# or
# yarn add mittt
```

Then with a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/), use as you would anything else:

```javascript
// using ES6 modules
import mittt from 'mittt'

// using CommonJS modules
var mittt = require('mittt')
```

The [ESM](https://jakearchibald.com/2017/es-modules-in-browsers/) build is also available on [unpkg](https://unpkg.com):

```html
<script type="module" src="https://unpkg.com/mittt/dist/mittt.esm.js"></script>
```

## Usage

```js
import mittt from 'mittt'

const emitter = mittt()

function onEvent(eventType, payload) {
  console.log(eventType, payload)
}

// Listen to an event
emitter.on('foo', onEvent)

// Listen to all events
emitter.on('*', onEvent)

// Fire an event
emitter.emit('foo')

// Fire an event with payload
const payload = { a: 'b' }
emitter.emit('bar', payload)

// Fire all registered handlers with payload
emitter.emit('*', payload) // payload is optional

// Given these listeners. Both onEvent would be invoked on '*' emit.
emitter.on('foo', onEvent)
emitter.on('bar', onEvent)
emitter.emit('*', payload)

// Fire all unique registered handlers with payload
emitter.emit('*!', payload) // payload is optional

// Given these listeners. Only one onEvent would be invoked on '*!' emit.
emitter.on('foo', onEvent)
emitter.on('bar', onEvent)
emitter.emit('*!', payload)

// Given these listeners. Both handlers would be invoked on '*!' emit.
emitter.on('foo', (eventType, payload) => {})
emitter.on('bar', (eventType, payload) => {})
emitter.emit('*!', payload)

// Working with handler references:
emitter.on('foo', onEvent) // listen
emitter.off('foo', onEvent) // unlisten

// Initiate emitter with on event setup
const eventHandlerMap = Object.create(null)
eventHandlerMap.foo = [
    (eventType, payload) => {
      console.log(eventType, payload) // foo, 123
    },
    (eventType, payload) => {
      console.log(eventType, payload) // foo, 123
    },
  ]
const emitter = mittt(eventHandlerMap)

emitter.emit('foo', 123) // all handlers for foo are invoked
```

### TypeScript

```ts
import mittt, { Emitter, EventHandler } from 'mittt'
const emitter: Emitter = mittt()

let foo: EventHandler = (eventType, payload) => {}

emitter.on('foo', foo)
```

## Smallest-Install

If you want to install the smallest size without wildcard (`*`) support.<br/>
<a href="https://bundlephobia.com/result?p=mittt@1">~200 bytes gzipped size</a>.

```sh
npm install mittt@^1
# or
# yarn add mittt@^1
```
