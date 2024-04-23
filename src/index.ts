import fs from "fs";
import path from "path";

function writeFile(filepath: string, content: string) {
  filepath = `query/${filepath}`;
  try {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
  } catch {}
  return fs.writeFileSync(filepath, content);
}

export function writeJSON(filepath: string, obj: any) {
  return writeFile(filepath, JSON.stringify(obj, null, 0));
}

function readJSONFile<T>(filepath: string) {
  return JSON.parse(fs.readFileSync(`${filepath}`, "utf8")) as T;
}

(async () => {
  const problems: { isbn_c_p: string; link: string }[] =
    readJSONFile("problems.json");
  console.log("done");
})();
