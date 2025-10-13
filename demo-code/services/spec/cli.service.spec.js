// spec/cli.service.spec.ts

import { CLIService } from '../cli.service.js'
import { nodeEnvService } from './mocks/node-env.service.mock.js'

let service
function init() {
  service = new CLIService(nodeEnvService)
}

describe('CLIService', () => {
  describe('constructor', () => {
    beforeEach(() => {
      init()
    })

    it('creates an instance of the service', () => {
      expect(service).toBeDefined()
    })
  })

  describe('getFileName', () => {
    beforeEach(() => {
      init()
    })

    it('has a function named getFileName', () => {
      expect(typeof service.getFileName).toEqual('function')
    })

    it('returns the file name from nodeEnvService.argv', () => {
      const result = service.getFileName()
      expect(result).toEqual('test-argv[2]')
    })
  })
})
