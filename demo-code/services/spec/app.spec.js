// spec/app.spec.ts

import { App } from '../app.js'
import { callsgetFileName, cliService } from './mocks/cli.service.mock.js'
import { callsgetFileContents, ioService } from './mocks/io.service.mock.js'
import { nodeEnvService } from './mocks/node-env.service.mock.js'

let app
function init() {
  app = new App(cliService, ioService, nodeEnvService)
}

describe('App', () => {
  describe('constructor', () => {
    beforeEach(() => {
      init()
    })

    it('creates an instance of the app', () => {
      expect(app).toBeDefined()
    })
  })

  describe('run', () => {
    beforeEach(() => {
      init()
    })

    it('has a function named run', () => {
      expect(typeof app.run).toEqual('function')
    })

    callsgetFileName(() => {
      app.run()
    })

    callsgetFileContents(() => {
      app.run()
    })
  })
})
