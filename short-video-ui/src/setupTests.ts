import '@testing-library/jest-dom'

// Provide a deterministic IntersectionObserver mock for tests
class IO {
  cb:any
  constructor(cb:any){this.cb=cb}
  observe(){ }
  disconnect(){ }
  unobserve(){ }
  takeRecords(){ }
}

// Keep a list of IO callbacks so tests can trigger specific targets
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: function(cb:any){
    if (!(window as any).__io_callbacks) (window as any).__io_callbacks = []
    ;(window as any).__io_callbacks.push(cb)
    return new IO(cb)
  }
})

// Helper to trigger intersection entries for a given target
;(window as any).__io_trigger = (target:any, isIntersecting = true) => {
  const cbs = (window as any).__io_callbacks || []
  cbs.forEach((cb:any)=>cb([{ isIntersecting, target }]))
}


// Mock HTMLMediaElement play/pause in jsdom
if (!(HTMLMediaElement.prototype as any).play) {
  HTMLMediaElement.prototype.play = function(){ return Promise.resolve() }
}
if (!(HTMLMediaElement.prototype as any).pause) {
  HTMLMediaElement.prototype.pause = function(){ return }
}
