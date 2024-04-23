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
  return JSON.parse(fs.readFileSync(`query/${filepath}`, "utf8")) as T;
}

class Chapter extends Array<{ isbn_c_p: string; link: string }> {}

class Book extends Map<string, Chapter> {
  isbn: string;
  name: string;
  constructor(isbn: string) {
    super();
    this.isbn = isbn;
    const name = booklist.find((b) => b.isbn === isbn)?.name;
    if (!name) throw new Error("Book not found");
    this.name = name;
  }
  get chapters() {
    return [...this.keys()].sort();
  }
  addProblem(prob: { isbn_c_p: string; link: string }) {
    const [isbn, c, p] = prob.isbn_c_p.split("_");
    if (!this.has(c)) this.set(c, new Chapter());
    this.get(c)!.push(prob);
  }
}

const booklist = readJSONFile("books.json") as { name: string; isbn: string }[];

const books = new Map<string, Book>();
function addProblem(prob: { isbn_c_p: string; link: string }) {
  const [isbn, c, p] = prob.isbn_c_p.split("_");
  if (!books.has(isbn)) books.set(isbn, new Book(isbn));
  books.get(isbn)!.addProblem(prob);
}

(async () => {
  const problems: { isbn_c_p: string; link: string }[] =
    readJSONFile("problems.json");
  console.log("done");
})();
