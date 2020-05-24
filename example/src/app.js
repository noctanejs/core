import { Render, Grid } from '@noctane/core'

const grid = Grid.generate({
  borderSize: 1,
  cellSize: 30
})

const renderConfig = {
  borderColor: '#ff926b',
  cellColor: '#fff3cd'
}

const canvas = document.getElementById('grid')
const context = canvas.getContext('2d')
const center = Grid.center(grid.grid)

const interval = 1000
const colors = [
  '#fee2b3',
  '#ffa299',
  '#ad6989',
  '#562349',
  '#ffcbcb',
  '#d291bc',
  '#aacfcf',
  '#679b9b',
  '#303960',
  '#ea9a96',
  '#f8b24f',
  '#5c2a9d'
]

const state = {
  // starts "in the past", so we blink it first time
  lastRender: Date.now() - (interval + 1),
  currentPosition: {
    col: center.col,
    row: center.row
  }
}

const nextPosition = (currentPosition) => {
  // Randomize the next position to pick in the grid
  let col = Math.floor(Math.random() * grid.config.cols)
  let row = Math.floor(Math.random() * grid.config.rows)
  if (col === currentPosition.col || row === currentPosition.row) {
    // Retry only once if the next random position
    // is exactly the same as the current one.
    // If it happens twice in a row is the JS gods desire.
    col = Math.floor(Math.random() * grid.config.cols)
    row = Math.floor(Math.random() * grid.config.rows)
  }

  return { col: col, row: row }
}

Render.loop((_) => {
  const cells = grid.grid
  const now = Date.now()
  if ((now - state.lastRender) < interval) return

  state.lastRender = now
  state.currentPosition = nextPosition(state.currentPosition)
  const cell = cells[state.currentPosition.row][state.currentPosition.col]
  const color = colors[Math.floor(Math.random() * colors.length)]

  Render.grid(grid, canvas, renderConfig)
  Render.cell(cell, canvas, { cellColor: color })

  return { ...state }
})
