import fs from "fs";
import path from "path";

function writeFile(filepath: string, content: string) {
  try {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
  } catch {}
  return fs.writeFileSync(filepath, content);
}

export function writeJSONFile(filepath: string, obj: any) {
  return writeFile(filepath, JSON.stringify(obj, null, 0));
}

function readJSONFile<T>(filepath: string) {
  return JSON.parse(fs.readFileSync(`${filepath}`, "utf8")) as T;
}

function updateCachedList() {
  const booklist = fs.readdirSync("static/");
  writeJSONFile("query/cached-books.json", booklist);
}

type Problem = { isbn_c_p: string; link: string };

(async () => {
  // const books = fs.readdirSync("query/books/");
  updateCachedList();
  console.log("done");
})();
