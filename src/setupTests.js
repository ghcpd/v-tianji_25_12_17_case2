import '@testing-library/jest-dom'

// Simple IntersectionObserver mock to allow tests to simulate entries
const observers = []
class MockIO {
  constructor(cb, opts){ this.cb = cb; this.opts = opts; observers.push(this) }
  observe() {}
  unobserve() {}
  disconnect() {}
  // helper for tests
  trigger(entries){ this.cb(entries)
  }
}

global.IntersectionObserver = MockIO
global.__io_observers = observers

// Basic media element play/pause mocks to avoid DOM errors in tests
if (typeof HTMLMediaElement !== 'undefined'){
  HTMLMediaElement.prototype.play = HTMLMediaElement.prototype.play || function(){ return Promise.resolve() }
  HTMLMediaElement.prototype.pause = HTMLMediaElement.prototype.pause || function() { return undefined }
}
