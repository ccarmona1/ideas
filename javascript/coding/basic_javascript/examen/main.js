class EventHandler {
  constructor(name) {
    this.name = name;
  }

  logEvent(eventName) {
    console.log(`${this.name} handled ${eventName}`);
  }

  // Método que será pasado como callback
  getBoundLogEvent() {
    return this.logEvent;
  }

  getArrowLogEvent = (eventName) => {
    console.log(`${this.name} handled ${eventName} via arrow`);
  };
}

const handler = new EventHandler('SystemLogger');
const eventCallback = handler.getBoundLogEvent();

setTimeout(eventCallback.bind(handler, 'Shutdown'), 100); // Llamada A
setTimeout(() => handler.logEvent('Startup'), 200);      // Llamada B
setTimeout(handler.getArrowLogEvent.bind(handler, 'Error'), 300); // Llamada C