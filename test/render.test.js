import Render from 'render'
import Grid from 'grid'

describe('Render', () => {
  describe('loop()', () => {
    test('calls callback until it returns {break: true}', () => {
      const myCallback = jest.fn()
      myCallback
        .mockReturnValueOnce()
        .mockReturnValueOnce()
        .mockReturnValueOnce({ break: true })

      Render.loop(myCallback, fn => fn())

      expect(myCallback.mock.calls.length).toBe(3)
    })
  })

  describe('grid()', () => {
    let canvas, config, context

    beforeEach(() => {
      config = {
        width: 300,
        height: 300,
        cellSize: 50,
        borderSize: 2,
        backgroundColor: '#f00'
      }
      const grid = Grid.empty(config).grid

      context = {
        beginPath: jest.fn(),
        fillRect: jest.fn(),
        strokeRect: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn()
      }

      canvas = {
        getContext: type => context
      }

      Render.grid(grid, canvas, config)
    })

    it('sets the background color correctly', () => {
      expect(context.fillStyle).toBe('#f00')
    })

    it('draws the correct outer square', () => {
      expect(context.fillRect.mock.calls[0]).toEqual([
        0, 0, 300, 300
      ])
    })
  })
})
