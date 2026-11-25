// Tell a Whole Story in 32 Characters — make.fun bounty
// u-xvader-tell-a-whole-story-in-32-characters-f86dd978
//
// The entry is a single Wi-Fi network name of at most 32 characters.
// This program composes it, checks it against the gate (UTF-8 text,
// 1 to 32 characters, not only whitespace), and writes it to
// /output/entry.txt for the judge.

import { mkdirSync, writeFileSync } from "node:fs";

// The name: an inheritance joke. Grandma is gone, the will is read,
// and the only thing she left her grandchild is the Wi-Fi network —
// a character, a situation, and something that happened, in the few
// words a passer-by sees in a phone's network list.
const ENTRY = "Grandma Left Me Only The WiFi";

const MAX_CHARS = 32;

function checkEntry(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1 to ${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // A Wi-Fi name is one line a phone shows in a list: no newline or
  // control characters, or the gate counts them and the name breaks.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
}

checkEntry(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

console.log(`entry (${[...ENTRY].length} chars): ${ENTRY}`);
