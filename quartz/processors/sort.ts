import { ProcessedContent } from "../plugins/vfile"
import { BuildCtx } from "../util/ctx"

export function sortContent(ctx: BuildCtx, content: ProcessedContent[]): ProcessedContent[] {
  const idxFile = content.find((c) => c?.[1]?.data?.filePath === "content/index.md")
  const frontmatter = idxFile?.[1]?.value?.toString().split("---")[1]
  const toc = frontmatter
    ?.slice(frontmatter?.indexOf("toc:\n"))
    .replace("toc:\n", "")
    .replaceAll("  - ", "")
    .split("\n")
    .filter((l) => !!l)

  content.sort((a, b) => (toc?.indexOf(filePath(a)) ?? 0) - (toc?.indexOf(filePath(b)) ?? 0))

  const filesNotInToc = content
    .map((c) => filePath(c))
    .filter((c) => !toc?.includes(c) && c !== "content/index.md")
  console.log("\nfilesNotInToc :>> ", filesNotInToc, "\n")

  return content
}

function filePath(x: ProcessedContent): string {
  return x?.[1]?.data?.filePath ?? ""
}
