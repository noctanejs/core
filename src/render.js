const defaultConfig = {
  backgroundColor: '#fff',
  borderColor: '#f00',

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
  const config = { ...defaultConfig, ...overrides, ...cell.config }
  const cellConfig = configForCell(cell, config)

  // top
  context.fillStyle = config.backgroundColor
  context.fillRect(cell.x, cell.y, config.cellSize, config.cellSize)

  context.beginPath()

  // bottom
  context.moveTo(cellConfig.startX, cellConfig.startY)
  context.lineTo(cellConfig.bottomLineX, cellConfig.bottomLineY)

  // left
  context.lineTo(cellConfig.leftLineX, cellConfig.leftLineY)

  context.strokeStyle = config.borderColor
  context.lineWidth = config.borderSize
  context.lineCap = 'square'
  context.stroke()
}

const grid = (grid, context, overrides) => {
  const config = { ...defaultConfig, ...overrides }
  const start = startPosition(grid, config)

  // border
  context.strokeStyle = config.borderColor
  context.strokeRect(start, start, config.width, config.height)

  // square
  context.fillStyle = config.backgroundColor
  context.fillRect(start, start, config.width, config.height)

  renderAllCells(grid, context, config)

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

const configForCell = (cell, cellConfig) => {
  let correctionForBorder = 0
  if (cellConfig.borderSize % 2 !== 0) correctionForBorder = 0.5

  return {
    startX: cell.x + correctionForBorder,
    startY: cell.y + cell.height + correctionForBorder,
    bottomLineX: cell.x + cell.width + correctionForBorder,
    bottomLineY: cell.y + cell.height + correctionForBorder,
    leftLineX: cell.x + cell.width + correctionForBorder,
    leftLineY: cell.y + correctionForBorder
  }
}

const startPosition = (grid, config) => {
  const odd = config.borderSize % 2 !== 0

  return odd ? 0.5 : 0
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
