import { execSync } from "child_process";

(async () => {
  const push = () => {
    execSync("git add .");
    execSync('git commit -m "upload"');
    execSync("git push");
    console.log("PUSHED");
    setTimeout(push, 10000);
  };
  setTimeout(push, 10000);
})();

// CMD: node ./dist/upload.js
