const Styles = {
  // TODO: better naming required XD.
  //  This is to decide what to do with borders when total size
  //  exceed the limits given by config.width and config.height.
  //  inward means total size will be shortened.
  //  ...
  inward: 'inward'
}

const defaultConfig = {
  width: 400,
  height: 400,
  cellSize: 20,
  borderSize: 1,
  borderStyle: Styles.inward
}

const createCell = (col, row, config) => {
  const x = (col * config.cellSize) + (col + 1) * config.borderSize
  const y = (row * config.cellSize) + (row + 1) * config.borderSize
  const width = config.cellSize
  const height = config.cellSize

  return {
    config: config,
    x: x,
    y: y,
    width: width,
    height: height,
    col: col,
    row: row,
    value: null
  }
}

const generateCells = (cols, rows, config) => {
  const cells = []

  for (let row = 0; row < rows; row++) {
    const column = []
    for (let col = 0; col < cols; col++) {
      column.push(createCell(col, row, config))
    }
    cells.push(column)
  }

  return cells
}

const empty = (overrides) => {
  const config = { ...defaultConfig, ...overrides }
  const totalCellSize = config.cellSize + config.borderSize
  const rows = Math.floor(config.height / totalCellSize)
  const height = rows * totalCellSize
  const cols = Math.floor(config.width / totalCellSize)
  const width = cols * totalCellSize

  return {
    grid: generateCells(cols, rows, config),
    config: {
      ...config,
      width: width,
      height: height,
      cols: cols,
      rows: rows
    }
  }
}

const center = (grid) => {
  const row = Math.floor(grid.length / 2)
  const col = Math.floor(grid[0].length / 2)

  return grid[row][col]
}

const Grid = {
  empty: empty,
  center: center
}

export default Grid
