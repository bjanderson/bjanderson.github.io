import fs from "fs"
import { glob } from "../../util/glob"
import { FilePath, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"

export const CopyAttachments: QuartzEmitterPlugin = () => ({
  name: "CopyAttachments",
  getQuartzComponents() {
    return []
  },
  async emit({ argv, cfg }, _content, _resources): Promise<FilePath[]> {
    const attachmentsPath = joinSegments("attachments")
    const attachmentsOutputPath = joinSegments(argv.output, "attachments")
    const fps = await glob("**", attachmentsPath, cfg.configuration.ignorePatterns)
    await fs.promises.cp(attachmentsPath, attachmentsOutputPath, {
      recursive: true,
      dereference: true,
    })
    return fps.map((fp) => joinSegments(argv.output, "static", fp)) as FilePath[]
  },
})
