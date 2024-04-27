import fs from "fs";
import path from "path";
import type { Problem } from "..";

async function getResourceLink(yadiskUrl: string) {
  yadiskUrl = decodeURIComponent(yadiskUrl);
  const metadataUrl = `https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=${yadiskUrl}`;
  const url = (await (await fetch(metadataUrl)).json()).href;
  if (typeof url !== "string") throw new Error("Not Found");
  return url;
}

function getProblemFilepath(isbn_c_p: string) {
  const isbn = isbn_c_p.split("_")[0];
  return `static/${isbn}/${isbn_c_p}.png`;
}

export function isProblemDownloaded(isbn_c_p: string) {
  const filepath = getProblemFilepath(isbn_c_p);
  const isExists = fs.existsSync(filepath);
  if (!isExists) return false;
  return fs.statSync(filepath).isFile();
}

export default async function downloadProblem({ isbn_c_p, link }: Problem) {
  const url = await getResourceLink(link);
  const res = await fetch(url);
  const { body, status } = res;
  if (status !== 200) throw new Error("Status Error");
  if (!body) throw new Error("Invalid Body");
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read();
    if (value) chunks.push(value);
    if (done) break;
  }
  const filepath = getProblemFilepath(isbn_c_p);
  try {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
  } catch {}
  fs.writeFileSync(filepath, new Uint8Array(Buffer.concat(chunks).buffer));
}
