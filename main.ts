// make.fun — "Unsent: The Micro-Confession Sprint"
// Writes one two-part micro-confession to /output/entry.txt:
// a To: line naming who it was meant for, then the unsent line itself.
// Deterministic: the text is a constant. No randomness, no clock, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "To: Mum\n" +
  "I told you I was fine the week Dad died because you needed one of us to be, and I've been practicing that lie for eleven years now.";

// The gate counts characters (code points), not UTF-16 units: count with [...].
const chars = (s: string) => [...s].length;
const lines = TEXT.split("\n");
if (chars(TEXT) < 1 || chars(TEXT) > 260) {
  throw new Error(`entry must be 1-260 characters, got ${chars(TEXT)}`);
}
if (lines.length !== 2 || !lines[0].startsWith("To: ")) {
  throw new Error("entry must be a To: line plus one message line");
}
if (chars(lines[1]) < 1 || chars(lines[1]) > 200) {
  throw new Error(`message line must be 1-200 characters, got ${chars(lines[1])}`);
}

const out = process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, TEXT + "\n", "utf8");
