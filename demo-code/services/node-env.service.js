// node-env.service.js

import { readFileSync } from 'fs'

export class NodeEnvService {
  constructor() {
    this.readFileSync = readFileSync
    this.argv = process.argv
    console.log('this.argv :>> ', this.argv)
  }
}
