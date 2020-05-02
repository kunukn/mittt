import mittt, { EventHandlerMap, Emitter } from '../src';

const emptyArray = [];

describe('mittt#', () => {
  let events: EventHandlerMap;
  let emitter: Emitter;

  beforeEach(() => {
    jest.clearAllMocks();
    events = Object.create(null);
    emitter = mittt(events);
  });

  describe('on()', () => {
    it('should default export be a function', () => {
      expect(mittt).toEqual(expect.any(Function));
    });

    it('should be a function', () => {
      expect(emitter).toHaveProperty('on');
      expect(emitter.on).toEqual(expect.any(Function));
    });

    it('should register handler for new type', () => {
      let foo = () => {};
      emitter.on('foo', foo);

      expect(events.foo).toStrictEqual([foo]);
    });

    it('should register handlers for any type strings', () => {
      let foo = () => {};
      emitter.on('constructor', foo);

      expect(events.constructor).toStrictEqual([foo]);
    });

    it('should append handler for existing type', () => {
      let foo = () => {};
      let bar = () => {};
      emitter.on('foo', foo);
      emitter.on('foo', bar);

      expect(events.foo).toStrictEqual([foo, bar]);
    });

    it('should NOT normalize case', () => {
      let foo = () => {};
      emitter.on('FOO', foo);
      emitter.on('Bar', foo);
      emitter.on('baz:baT!', foo);

      expect(events.FOO).toStrictEqual([foo]);
      expect(events).not.toHaveProperty('foo');
      expect(events.Bar).toStrictEqual([foo]);
      expect(events).not.toHaveProperty('bar');
      expect(events['baz:baT!']).toStrictEqual([foo]);
    });
  });

  describe('off()', () => {
    it('should be a function', () => {
      expect(emitter.off).toEqual(expect.any(Function));
    });

    it('should remove handler for type', () => {
      let foo = () => {};
      emitter.on('foo', foo);
      emitter.off('foo', foo);

      expect(events.foo).toEqual(emptyArray);
    });

    it('should NOT normalize case', () => {
      let foo = () => {};
      emitter.on('FOO', foo);
      emitter.on('Bar', foo);
      emitter.on('baz:bat!', foo);

      emitter.off('FOO', foo);
      emitter.off('Bar', foo);
      emitter.off('baz:baT!', foo);

      expect(events.FOO).toEqual(emptyArray);
      expect(events).not.toHaveProperty('foo');
      expect(events.Bar).toEqual(emptyArray);
      expect(events).not.toHaveProperty('bar');
      expect(events['baz:bat!']).toHaveLength(1);
    });
  });

  describe('emit()', () => {
    it('should be a function', () => {
      expect(emitter).toHaveProperty('emit');
      expect(emitter.emit).toEqual(expect.any(Function));
    });

    it('should invoke handler for eventType', () => {
      let payload = { a: 'b' };

      let onEvent = jest.fn();

      emitter.on('foo', onEvent);
      emitter.emit('foo', payload);
      expect(onEvent).toHaveBeenCalledTimes(1);
      expect(onEvent).toHaveBeenCalledWith('foo', payload);
      onEvent.mockClear();

      emitter.on('bar', onEvent);
      emitter.emit('bar');
      expect(onEvent).toHaveBeenCalledTimes(1);
      expect(onEvent).toHaveBeenCalledWith('bar');
      onEvent.mockClear();

      emitter.on('', onEvent);
      emitter.emit('');
      expect(onEvent).toHaveBeenCalledTimes(1);
      expect(onEvent).toHaveBeenCalledWith('');
      onEvent.mockClear();
    });

    it('should NOT ignore case', () => {
      let onFoo = jest.fn(),
        onFOO = jest.fn();
      events.Foo = [onFoo];
      events.FOO = [onFOO];

      emitter.emit('Foo', 'Foo arg');
      emitter.emit('FOO', 'FOO arg');
      expect(onFoo).toHaveBeenCalledTimes(1);
      expect(onFoo).toHaveBeenCalledWith('Foo', 'Foo arg');

      expect(onFOO).toHaveBeenCalledTimes(1);
      expect(onFOO).toHaveBeenCalledWith('FOO', 'FOO arg');
    });

    it('should invoke * handlers', () => {
      let star = jest.fn(),
        payload1 = { a: 'a' },
        payload2 = { b: 'b' };

      events['*'] = [star];

      emitter.emit('foo', payload1);
      expect(star).toHaveBeenCalledTimes(1);
      expect(star).toHaveBeenCalledWith('foo', payload1);
      star.mockClear();

      emitter.emit('bar', payload2);
      expect(star).toHaveBeenCalledTimes(1);
      expect(star).toHaveBeenCalledWith('bar', payload2);
      star.mockClear();

      emitter.emit('baz');
      expect(star).toHaveBeenCalledTimes(1);
      expect(star).toHaveBeenCalledWith('baz');
    });

    it('should be able to emit ** and invoke all handlers', () => {
      let event1 = jest.fn();
      let event2 = jest.fn();
      let event3 = jest.fn();
      let payload = { a: 'a' };

      events['foo'] = [event1, event2];
      events['bar'] = [event1, event2, event3];

      emitter.emit('**', payload);

      expect(event1).toHaveBeenCalledTimes(2);
      expect(event1).toHaveBeenCalledWith('**', payload);
      expect(event2).toHaveBeenCalledTimes(2);
      expect(event2).toHaveBeenCalledWith('**', payload);
      expect(event3).toHaveBeenCalledTimes(1);
      expect(event3).toHaveBeenCalledWith('**', payload);
    });

    it('should be able to emit * and invoke all unique handlers', () => {
      let event1 = jest.fn();
      let event2 = jest.fn();
      let event3 = jest.fn();
      let payload = { a: 'a' };

      events['foo'] = [event1, event2];
      events['bar'] = [event1, event2, event3];

      emitter.emit('*', payload);

      expect(event1).toHaveBeenCalledTimes(1);
      expect(event1).toHaveBeenCalledWith('*', payload);
      expect(event2).toHaveBeenCalledTimes(1);
      expect(event2).toHaveBeenCalledWith('*', payload);
      expect(event3).toHaveBeenCalledTimes(1);
      expect(event3).toHaveBeenCalledWith('*', payload);
    });
  });
});
