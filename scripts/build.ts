import fs from "fs";
import path from "path";
import Mustache from "mustache";
import { globSync } from "glob";

// const md = Markdown({ html: true })

// mustache partials
const page = fs.readFileSync("resources/mustache/page.mustache", "utf8");
const meta = fs.readFileSync("resources/mustache/meta.mustache", "utf8");
const header = fs.readFileSync("resources/mustache/header.mustache", "utf8");
const footer = fs.readFileSync("resources/mustache/footer.mustache", "utf8");

// builds a single page
function _buildPage(body: string) {
  console.log("Building page...");

  // render markdown to html
  const view = { body: body };
  const partials = { meta: meta, header: header, footer: footer };

  // template using mustache
  return Mustache.render(page, view, partials)
}

function _copyDirectory(source: string, destination: string) {
  fs.cp(source, destination, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error copying from ${source} to ${destination}:`, err);
    }
  });
}

function _buildWebsite() {
  // create website directory for output
  if (!fs.existsSync("website")) {
    fs.mkdirSync("website");
  }

  // glob all .html files
  const html_glob = globSync("resources/content/*.html");
  html_glob.forEach((file: string) => {
    try {
      const name = path.parse(file).name;
      const body = fs.readFileSync(file, "utf8");
      const page = _buildPage(body);

      fs.writeFile(`website/${name}.html`, page, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        }
      });
    } catch (err) {
      console.error("Error processing file:", err);
    }
  });

  // copy assets to output
  _copyDirectory("resources/extra", "website");
  _copyDirectory("resources/assets", "website/assets");
}

// main.js
_buildWebsite();