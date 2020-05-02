export type EventHandler = (eventType: string, payload?: any) => void;

// An array of all currently registered event handlers for an eventType
export type EventHandlerList = Array<EventHandler>;

// A map of event types and their corresponding event handlers.
export type EventHandlerMap = {
  '*'?: EventHandlerList;
  [eventType: string]: EventHandlerList;
};

export type Emitter = {
  on: (eventType: string, handler: EventHandler) => void;
  off: (eventType: string, handler: EventHandler) => void;
  emit: (eventType: string, payload?: any) => void;
};

export default function mittt(all: EventHandlerMap): Emitter {
  all = all || Object.create(null);

  return {
    on(eventType: string, handler: EventHandler) {
      (all[eventType] || (all[eventType] = [])).push(handler);
    },

    off(eventType: string, handler: EventHandler) {
      if (all[eventType]) {
        all[eventType].splice(all[eventType].indexOf(handler) >>> 0, 1);
      }
    },

    /**
     * Invoke all handlers for the given eventType.
     * If present, `"*"` handlers are invoked after type-matched handlers.
     *
     * @param {String} eventType  The event type to invoke
     * @param {Any} [payload]  Any value (object is recommended and powerful), passed to each handler
     * @memberOf mittt
     */
    /* eslint array-callback-return: 0 */
    emit(eventType: string, payload?: any) {
      if (eventType === '*') {
        Object.keys(all).forEach(key => {
          (all[key] || []).slice().map(handler => {
            if (typeof payload !== 'undefined') handler(eventType, payload);
            else handler(eventType);
          });
        });
      } else if (eventType === '**') {
        let set: Set<EventHandler> = new Set();

        Object.keys(all).forEach(key => {
          (all[key] || []).slice().map(handler => set.add(handler));
        });
        set.forEach(handler => {
          if (typeof payload !== 'undefined') handler(eventType, payload);
          else handler(eventType);
        });
      } else {
        (all[eventType] || []).slice().map(handler => {
          if (typeof payload !== 'undefined') handler(eventType, payload);
          else handler(eventType);
        });
        (all['*'] || []).slice().map(handler => {
          if (typeof payload !== 'undefined') handler(eventType, payload);
          else handler(eventType);
        });
      }
    },
  };
}
