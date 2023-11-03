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
    console.error(
      "Must provide destination directory!\n\nTry something like:\n`npm run outliner -- -s ./sourcedir -d './output`\n\n"
    );
    return;
  }

  const files = fs.readdirSync(source);

  for (const file of files) {
    if (path.extname(file) === ".svg") {
      console.log(file);

      const text = fs.readFileSync(path.join(source, file), "utf-8");

      console.log(text);
    }
  }
}

main();
