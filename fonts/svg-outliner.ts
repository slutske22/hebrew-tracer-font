// npm run outliner -- --source ./

import fs from "fs";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { JSDOM } from "jsdom";

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

  for (const file of files) {
    if (path.extname(file) === ".svg") {
      let text = fs.readFileSync(path.join(source, file), "utf-8");

      // Process the text - convert to dom, manipulate, then back to string
      const dom = new JSDOM(text);
      const svg = dom.window.document.querySelector("svg");
      const pathElement = dom.window.document.querySelector("path");

      // Change fill and stroke to create outline:
      pathElement?.setAttribute("fill", "none");
      pathElement?.setAttribute("stroke", "black");
      pathElement?.setAttribute("stroke-width", "40");
      pathElement?.setAttribute("stroke-location", "inside");

      // Widen the viewport to accomodate widening the outline
      let viewBox = svg?.getAttribute("viewBox");
      viewBox = viewBox
        ?.split(" ")
        .map((item, idx) => {
          const d = Number(item);
          if (idx === 0) return d - 20;
          if (idx === 2) return file.startsWith("N") ? d + 50 : d + 20;
          return d;
        })
        .join(" ");
      svg?.setAttribute("viewBox", viewBox as string);

      text = svg?.outerHTML as string;

      if (dest && !fs.existsSync(dest)) {
        console.warn(
          `Destination directory "${dest}" does not exist, creating dir\n`
        );
        fs.mkdirSync(dest);
      }

      if (!dest && !fs.existsSync(path.join(source, "output"))) {
        fs.mkdirSync(path.join(source, "output"));
      }

      const outputPath = dest ?? path.join(source, "output");

      console.log(`Writing modified file: ${dest}/${file}`);

      fs.writeFileSync(path.join(outputPath, file), text);
    }
  }
}

main();
