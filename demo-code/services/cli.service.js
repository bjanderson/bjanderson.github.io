// cli.service.js

export class CLIService {
  constructor(nodeEnvService) {
    this.nodeEnvService = nodeEnvService
  }

  getFileName() {
    return this.nodeEnvService.argv[2]
  }
}
