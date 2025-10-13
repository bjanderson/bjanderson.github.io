// spec/io.service.spec.ts

import { IOService } from '../io.service.js'
import { callsreadFileSync, nodeEnvService } from './mocks/node-env.service.mock.js'

let service
function init() {
  service = new IOService(nodeEnvService)
}

describe('IOService', () => {
  describe('constructor', () => {
    beforeEach(() => {
      init()
    })

    it('creates an instance of the service', () => {
      expect(service).toBeDefined()
    })
  })

  describe('getFileContents', () => {
    beforeEach(() => {
      init()
    })

    it('has a function named getFileContents', () => {
      expect(typeof service.getFileContents).toEqual('function')
    })

    callsreadFileSync(() => {
      const fileName = 'test-file'
      service.getFileContents(fileName)
    }, ['test-file', { encoding: 'utf8' }])

    it('returns the response from nodeEnvService.readFileSync', () => {
      const fileName = 'test-file'
      const result = service.getFileContents(fileName)
      expect(result).toEqual('test readFileSync')
    })
  })
})
