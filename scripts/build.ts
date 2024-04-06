import fs from "fs";
import path from "path";
// import Markdown from "markdown-it";
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

function _buildWebsite() {
  console.log("Building website...");

  // create website directory for output
  if (!fs.existsSync("website")) {
    fs.mkdirSync("website");
  }

  // glob all .html files
  const html_glob = globSync("resources/content/*.html");
  for (const file of html_glob) {
    console.log("found a .html file:", file);
    try {
      const name = path.parse(file).name;
      const body = fs.readFileSync(file, "utf8");
      const page = _buildPage(body);
      fs.writeFile(`website/${name}.html`, page, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  // copy assets to output
  fs.cp("resources/assets", "website/assets", { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });

  // copy extra to output
  fs.cp("resources/extra", "website", { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

// main.js
_buildWebsite();