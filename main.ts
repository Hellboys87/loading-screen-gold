import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TIP =
  "Tip: the bar isn't stuck — you and your agent are both waiting for the other one to admit neither of you knows what this code does.";

// The sealed scorer rejects invalid entries with 0 and no rate, so fail
// loudly here instead of silently writing a tip that can never score.
if (TIP.trim().length === 0) {
  throw new Error("entry tip must not be blank");
}
if (TIP.length > 200) {
  throw new Error(
    `entry tip is ${TIP.length} chars, over the 200-char limit`,
  );
}
if (TIP.includes("\n") || TIP.includes("\r")) {
  throw new Error("entry tip must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TIP, "utf8");
