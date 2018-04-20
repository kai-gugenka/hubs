AFRAME.registerComponent("event-repeater", {
  schema: {
    eventSource: { type: "selector" },
    events: { type: "array" }
  },

  play: function() {
    this.data.eventListeners = [];
    const events = this.data.events;
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      this.data.eventListeners[event] = this._handleEvent.bind(this, event);
      this.data.eventSource.addEventListener(event, this.data.eventListeners[event]);
    }
  },

  pause: function() {
    const events = this.data.events;
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      this.data.eventSource.removeEventListener(event, this.data.eventListeners[event]);
    }
    this.data.eventListeners = [];
  },

  _handleEvent: function(event, e) {
    this.el.emit(event, e.detail ? e.detail : {});
  }
});
