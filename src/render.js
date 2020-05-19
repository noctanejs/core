const loop = (callback, requestAnimationFrame = window.requestAnimationFrame, state = {}) => {
  if (callback === undefined) {
    throw new Error('Parameter callback (1st) should be a function')
  }

  // The property break: true stops the loop
  const newState = { ...state, ...callback(state) }
  if (!newState.break) {
    requestAnimationFrame(() => loop(callback, requestAnimationFrame, { ...newState }))
  }
}

const Render = {
  loop: loop
}

export default Render
