import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import downloadProblem, { isProblemDownloaded } from "./download";

export type Problem = { isbn_c_p: string; link: string };

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

(async () => {
  // const books = fs.readdirSync("query/books/");
  // updateCachedList();
  // console.log("done");
})();

function getProblems() {
  return (readJSONFile("query/problems-part-1.json") as Problem[]).concat(
    readJSONFile("query/problems-part-2.json")
  );
}

class ProblemTask {
  static execting: Set<ProblemTask> = new Set();
  readonly problem: Problem;
  constructor(problem: Problem) {
    this.problem = { ...problem };
  }
  get isbn_c_p() {
    return this.problem.isbn_c_p;
  }
  get link() {
    return this.problem.link;
  }
  get done() {
    return isProblemDownloaded(this.isbn_c_p);
  }
  exec(cb?: () => void) {
    if (this.done) return;
    ProblemTask.execting.add(this);
    downloadProblem(this.problem)
      .then(() => console.log("OK    :", this.isbn_c_p))
      .catch((e) =>
        console.log(
          "FAILED:",
          this.isbn_c_p,
          e instanceof Error ? `${e.name} ${e.message}` : "Unknown error"
        )
      )
      .finally(() => {
        ProblemTask.execting.delete(this);
        if (cb) cb();
      });
  }
}

(async () => {
  const tasks = getProblems().map((i) => new ProblemTask(i));
  const run = () => {
    if (tasks.length === 0) return;
    if (ProblemTask.execting.size < 64) {
      const task = tasks.shift()!;
      task.exec(() => {
        if (!task.done) tasks.push(task);
      });
    }
    setTimeout(run, 0);
  };
  const push = () => {
    execSync("git add .");
    execSync('git commit -m "upload"');
    execSync("git push");
    setTimeout(push, 1000);
  };
  // run();
  push();
})();

// CMD: node ./dist/index.js
