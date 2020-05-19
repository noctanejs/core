import Render from 'render'

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
})
