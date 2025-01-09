import fs from "fs";
import path from "path";
import Mustache from "mustache";
import { globSync } from "glob";

// string constants
const content_path = "resources/content";
const mustache_path = "resources/mustache";
const assets_path = "website/assets";

// mustache partials
const page = fs.readFileSync(`${mustache_path}/page.mustache`, "utf8");
const meta = fs.readFileSync(`${mustache_path}/meta.mustache`, "utf8");
const header = fs.readFileSync(`${mustache_path}/header.mustache`, "utf8");
const footer = fs.readFileSync(`${mustache_path}/footer.mustache`, "utf8");

// helper functions
function _copyDirectory(source: string, destination: string) {
  fs.cp(source, destination, { recursive: true, force: true }, (err) => { if (err) { console.error(`Error copying directory from ${source} to ${destination}:`, err); } });
}
function _copyFile(source: string, destination: string) {
  fs.copyFile(source, destination, (err) => { if (err) { console.error(`Error copying file from ${source} to ${destination}:`, err); } });
}
function _writeFile(destination: string, content: string) {
  fs.writeFile(destination, content, (err) => { if (err) { console.error(`Error writting file to ${destination}:`, err); } });
}

// builds a single page
function _buildPage(body: string) {
  console.log("Building page...");

  // render markdown to html
  const view = { body: body };
  const partials = { meta: meta, header: header, footer: footer };

  // template using mustache
  return Mustache.render(page, view, partials)
}

function _buildWebsite() {
  console.log("Building website...");

  // create website directory for output
  if (!fs.existsSync("website")) {
    fs.mkdirSync("website");
  }

  // glob all .html files
  const html_glob = globSync(`${content_path}/*.html`);
  for (const file of html_glob) {
    const name = path.parse(file).base;
    const body = fs.readFileSync(file, "utf8");
    const page = _buildPage(body);

    // copy to output
    _writeFile(`website/${name}`, page);
  }

  // copy to output
  _copyDirectory("resources/assets", "website/assets");
  _copyDirectory("resources/extra", "website");

  // copy bootstrap and vuejs
  _copyFile("node_modules/bootstrap/dist/css/bootstrap.min.css", `${assets_path}/css/bootstrap.min.css`);
}

// main.js
_buildWebsite();