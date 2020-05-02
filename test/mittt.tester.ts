import {
  EventHandlerMap,
  Emitter,
  EventHandler,
  EventHandlerList,
} from '../src'

const emptyArray = []

export default function Tester(mittt: Function) {
  describe('mittt#', () => {
    let events: EventHandlerMap
    let emitter: Emitter

    beforeEach(() => {
      jest.clearAllMocks()
      events = Object.create(null)
      emitter = mittt(events)
    })

    describe('on()', () => {
      it('should default export be a function', () => {
        expect(mittt).toEqual(expect.any(Function))
      })

      it('should be a function', () => {
        expect(emitter).toHaveProperty('on')
        expect(emitter.on).toEqual(expect.any(Function))
      })

      it('should register handler for new type', () => {
        let foo: EventHandler = () => {}
        emitter.on('foo', foo)

        expect(events.foo).toStrictEqual([foo])
      })

      it('should register handlers for any type strings', () => {
        let foo: EventHandler = () => {}
        emitter.on('constructor', foo)

        expect(events.constructor).toStrictEqual([foo])
      })

      it('should append handler for existing type', () => {
        let foo: EventHandler = () => {}
        let bar: EventHandler = () => {}
        emitter.on('foo', foo)
        emitter.on('foo', bar)

        expect(events.foo).toStrictEqual([foo, bar])
      })

      it('should NOT normalize case', () => {
        let foo: EventHandler = () => {}
        emitter.on('FOO', foo)
        emitter.on('Bar', foo)
        emitter.on('baz:baT!', foo)

        expect(events.FOO).toStrictEqual([foo])
        expect(events).not.toHaveProperty('foo')
        expect(events.Bar).toStrictEqual([foo])
        expect(events).not.toHaveProperty('bar')
        expect(events['baz:baT!']).toStrictEqual([foo])
      })
    })

    describe('off()', () => {
      it('should be a function', () => {
        expect(emitter.off).toEqual(expect.any(Function))
      })

      it('should remove handler for type', () => {
        let foo: EventHandler = () => {}
        emitter.on('foo', foo)
        emitter.off('foo', foo)

        expect(events.foo).toEqual(emptyArray)
      })

      it('should NOT normalize case', () => {
        let foo: EventHandler = () => {}
        emitter.on('FOO', foo)
        emitter.on('Bar', foo)
        emitter.on('baz:bat!', foo)

        emitter.off('FOO', foo)
        emitter.off('Bar', foo)
        emitter.off('baz:baT!', foo)

        expect(events.FOO).toEqual(emptyArray)
        expect(events).not.toHaveProperty('foo')
        expect(events.Bar).toEqual(emptyArray)
        expect(events).not.toHaveProperty('bar')
        expect(events['baz:bat!']).toHaveLength(1)
      })
    })

    describe('emit()', () => {
      it('should be a function', () => {
        expect(emitter).toHaveProperty('emit')
        expect(emitter.emit).toEqual(expect.any(Function))
      })

      it('should invoke handler for eventType', () => {
        let payload = { a: 'b' }

        let handler = jest.fn()

        emitter.on('foo', handler)
        emitter.emit('foo', payload)
        expect(handler).toHaveBeenCalledTimes(1)
        expect(handler).toHaveBeenCalledWith('foo', payload)
        handler.mockClear()

        emitter.on('bar', handler)
        emitter.emit('bar')
        expect(handler).toHaveBeenCalledTimes(1)
        expect(handler).toHaveBeenCalledWith('bar', undefined)
        handler.mockClear()

        emitter.on('', handler)
        emitter.emit('')
        expect(handler).toHaveBeenCalledTimes(1)
        expect(handler).toHaveBeenCalledWith('', undefined)
        handler.mockClear()
      })

      it('should NOT ignore case', () => {
        let onFoo: EventHandler = jest.fn(),
          onFOO: EventHandler = jest.fn()
        events.Foo = [onFoo]
        events.FOO = [onFOO]

        emitter.emit('Foo', 'Foo arg')
        emitter.emit('FOO', 'FOO arg')
        expect(onFoo).toHaveBeenCalledTimes(1)
        expect(onFoo).toHaveBeenCalledWith('Foo', 'Foo arg')

        expect(onFOO).toHaveBeenCalledTimes(1)
        expect(onFOO).toHaveBeenCalledWith('FOO', 'FOO arg')
      })

      it('should be able to initiate emitter with handlers and emit those', () => {
        // Arrange
        let handler1: EventHandler = jest.fn()
        let handler2: EventHandler = jest.fn()
        let foo: EventHandlerList = [handler1, handler2]
        let events: EventHandlerMap = {
          foo,
        }
        emitter = mittt(events)

        let payload = { a: 'a' }

        // Act
        emitter.emit('foo', payload)

        // Assert
        expect(handler1).toHaveBeenCalledTimes(1)
        expect(handler1).toHaveBeenCalledWith('foo', payload)
        expect(handler2).toHaveBeenCalledTimes(1)
        expect(handler2).toHaveBeenCalledWith('foo', payload)
      })
    })
  })
}
