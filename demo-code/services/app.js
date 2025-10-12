// app.js

export class App {
  constructor(cliService, ioService, nodeEnvService) {
    this.cliService = cliService
    this.ioService = ioService
    this.nodeEnvService = nodeEnvService
  }

  run() {
    const fileName = this.cliService.getFileName()
    const fileContents = this.ioService.getFileContents(fileName)

    console.log(fileContents)
  }
}
