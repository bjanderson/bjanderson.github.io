// index.js

import { App } from "./app.js"
import { CLIService } from "./cli.service.js"
import { IOService } from "./io.service.js"
import { NodeEnvService } from "./node-env.service.js"

const nodeEnvService = new NodeEnvService()

const ioService = new IOService(nodeEnvService)
const cliService = new CLIService(nodeEnvService)

const app = new App(cliService, ioService, nodeEnvService)
app.run()
