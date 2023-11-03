// npm run outliner -- --source ./

import fs from "fs";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

function main() {
  const argv = yargs(hideBin(process.argv)).argv;

  // @ts-expect-error these exist
  const source = argv.s ?? argv.source;
  // @ts-expect-error these exist
  const dest = argv.d ?? argv.dest;

  if (!source) {
    console.error(
      "Must provide source directory!\n\nTry something like:\n`npm run outliner -- -s ./sourcedir -d './output`\n\n"
    );
    return;
  }

  if (!dest) {
    console.warn("No destination provided, writing to source directory\n\n");
  }

  const files = fs.readdirSync(source);

  for (const file of [files[0]]) {
    if (path.extname(file) === ".svg") {
      const text = fs.readFileSync(path.join(source, file), "utf-8");

      // process the text

      if (dest && !fs.existsSync(dest)) {
        console.error(`Destination directory "${dest}" does not exist\n`);
        return;
      }

      if (!dest && !fs.existsSync(path.join(source, "output"))) {
        fs.mkdirSync(path.join(source, "output"));
      }

      const outputPath = dest ?? path.join(source, "output");

      fs.writeFileSync(path.join(outputPath, file), text);
    }
  }
}

main();
