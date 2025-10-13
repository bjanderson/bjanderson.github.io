// io.service.js

export class IOService {
  constructor(nodeEnvService) {
    this.nodeEnvService = nodeEnvService
  }

  getFileContents(fileName) {
    return this.nodeEnvService.readFileSync(fileName, { encoding: 'utf8' })
  }
}
