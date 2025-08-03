import { spawnSync } from "child_process";
import { writeFileSync } from "fs";

const header = ["Size (kb)", "Time (ms)"];
const files = ["14kb.bin", "15kb.bin"];
const results = [];
const iterations = 100;

for (let i = 0; i < iterations; i++) {
  for (const file of files) {
    const start = Date.now();
    spawnSync("node", ["fetch.js", file]);
    const end = Date.now();
    results.push([file, end - start]);
  }
}

writeFileSync(
  "benchmark.csv",
  [header, ...results].map((row) => row.join(",")).join("\n")
);

writeFileSync(
  "benchmark.mmd",
  `%%{init: { 'themeVariables': { 'xyChart': { 'plotColorPalette': '#1d45aaff, #d84519ff' } } }}%%
xychart-beta
  title "Benchmark: 14kb vs 15kb"
  x-axis Iteration 1 --> 100
  y-axis "Time (ms)"
  line [${results
    .filter((r) => r[0] === files[0])
    .map((r) => r[1])
    .join(", ")}]
  line [${results
    .filter((r) => r[0] === files[1])
    .map((r) => r[1])
    .join(", ")}]
`
);
