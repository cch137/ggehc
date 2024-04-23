import fs from "fs";

const QUERY_URL =
  "https://www.litsolutions.org/_api/cloud-data/v1/wix-data/collections/query";
const AUTH = fs.readFileSync("refs/auth", "utf8");

export default async function query(q: any) {
  return await fetch(QUERY_URL, {
    method: "POST",
    headers: {
      Authorization: AUTH,
      Commonconfig:
        '{"brand":"wix","host":"VIEWER","BSI":"2d95dbef-464d-418e-83f8-22aacc4d19ea|1"}',
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Referer:
        "https://www.litsolutions.org/_partials/wix-thunderbolt/dist/clientWorker.a0a59fdc.bundle.min.js",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
      "X-Wix-Brand": "wix",
      "X-Wix-Client-Artifact-Id": "wix-thunderbolt",
    },
    body: JSON.stringify(q),
  });
}
