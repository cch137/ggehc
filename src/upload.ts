import { execSync } from "child_process";

(async () => {
  const push = () => {
    console.log("START...");
    console.time("ADDED");
    execSync("git add .");
    console.timeEnd("ADDED");
    console.time("COMMITED");
    execSync('git commit -m "upload"');
    console.timeEnd("COMMITED");
    console.time("PUSHED");
    execSync("git push");
    console.timeEnd("PUSHED");
    setTimeout(push, 0);
  };
  setTimeout(push);
})();

// CMD: node ./dist/upload.js
