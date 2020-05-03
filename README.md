<p align="center">

  <a href="https://www.npmjs.org/package/mittt">
  <img src="https://img.shields.io/npm/v/mittt.svg?style=flat" alt="npm"></a>   <a href="https://david-dm.org/kunukn/mittt"><img src="http://img.badgesize.io/https://unpkg.com/mittt/dist/mittt.cjs.production.min.js?compression=gzip" alt="gzip size">
</a>

</p>
<br/>

# Mittt

> Tiny functional event emitter / pubsub.<br/>
> Forked from https://github.com/developit/mitt<br/>
> New project created from TSDX CLI.

- **Microscopic:** weighs <a href="https://bundlephobia.com/result?p=mittt@1">~200 bytes gzipped size</a>.
- **Functional:** methods don't rely on `this`

Mittt was made for the browser, but works in any JavaScript runtime. It has no dependencies and supports IE9+.

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

// Fire an event
emitter.emit('foo')

// Fire an event with payload
const payload = { a: 'b' }
emitter.emit('bar', payload)

// Working with handler references:
emitter.on('foo', onEvent) // listen
emitter.off('foo', onEvent) // unlisten

// Initiate emitter with on event setup
const emitter = mittt({
  foo: [
    (eventType, payload) => {
      console.log(eventType, payload) // foo, undefined
    },
    (eventType, payload) => {
      console.log(eventType, payload) // foo, undefined
    },
  ],
})

emitter.emit('foo') // all handlers for foo are invoked
```

### TypeScript

```ts
import mittt, { Emitter, EventHandler } from 'mittt'
const emitter: Emitter = mittt()

let foo: EventHandler = (eventType, payload) => {}

emitter.on('foo', foo)
```
