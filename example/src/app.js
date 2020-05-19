import { Render, Grid } from '@noctane/core'

const grid = Grid.empty()
const canvas = document.getElementById('grid')
const context = canvas.getContext('2d')
const center = Grid.center(grid.cells)
const interval = 1000
const colors = [
  '#f00',
  '#0f0',
  '#00f',
  '#a00',
  '#0a0',
  '#00a',
  '#500',
  '#050',
  '#005'
]

const state = {
  // starts "in the past", so we blink it first time
  lastRender: Date.now() - (interval + 1),
  currentPosition: {
    col: center.col,
    row: center.row
  }
}

canvas.width = 400
canvas.height = 400

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
  const now = Date.now()
  if ((now - state.lastRender) < interval) return

  state.lastRender = now
  state.currentPosition = nextPosition(state.currentPosition)
  const cell = grid.cells[state.currentPosition.row][state.currentPosition.col]
  const color = colors[Math.floor(Math.random() * colors.length)]

  Grid.render(grid.cells, context, {
    width: canvas.width,
    height: canvas.height
  })
  Grid.renderCell(cell, context, { backgroundColor: color })

  return { ...state }
})
