const defaultConfig = {
  borderColor: '#000',
  cellColor: '#999',

  debug: false,
  debugConfig: {
    coords: false,
    fontSize: 10,
    backgroundColor: '#fff',
    color: '#f00'
  }
}

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

const cell = (cell, context, overrides) => {
  const config = { ...defaultConfig, ...overrides }

  context.fillStyle = config.cellColor
  context.fillRect(cell.x, cell.y, cell.width, cell.height)
}

const grid = (grid, canvas, overrides) => {
  const cells = grid.grid
  const context = canvas.getContext('2d')
  const config = { ...defaultConfig, ...overrides }

  const frame = {
    x: grid.config.borderSize,
    y: grid.config.borderSize,
    width: grid.config.width + grid.config.borderSize,
    height: grid.config.height + grid.config.borderSize
  }

  canvas.width = frame.width
  canvas.height = frame.height

  // square
  context.fillStyle = config.borderColor
  context.fillRect(0, 0, frame.width, frame.height)

  renderAllCells(cells, context, config)

  return grid
}

const renderAllCells = (grid, context, overrides) => {
  grid.forEach((cols, row) => {
    cols.forEach((_cell, col) => {
      const config = { ..._cell.config, ...overrides }
      cell(_cell, context, config)

      if (config.debug) {
        debug(_cell, `${_cell.x}:${_cell.y} ${row}:${col}`, context, config)
      }
    })
  })
}

const debug = (cell, text, context, config) => {
  const position = {
    x: cell.x + config.borderSize,
    y: cell.y + config.borderSize + config.debugConfig.fontSize
  }
  context.font = `${config.debugConfig.fontSize}px sans-serif`

  const size = context.measureText(text)
  context.fillStyle = config.debugConfig.backgroundColor
  context.fillRect(
    position.x,
    position.y - config.debugConfig.fontSize,
    Math.ceil(size.actualBoundingBoxLeft + size.actualBoundingBoxRight),
    Math.ceil(size.actualBoundingBoxAscent + size.actualBoundingBoxDescent + 2)
  )

  context.fillStyle = config.debugConfig.color
  context.fillText(
    text,
    cell.x + config.borderSize,
    cell.y + config.debugConfig.fontSize
  )
}

const Render = {
  loop: loop,
  grid: grid,
  cell: cell
}

export default Render
