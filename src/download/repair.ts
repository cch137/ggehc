// (async () => {
//   const fs = await import("fs");
//   const jimp = await import("jimp");
//   interface PageObj {
//     isbn_c_p: string;
//     link: string;
//   }
//   // if you want to change the source, remember also change the isbn below
//   const list: PageObj[] = JSON.parse(
//     fs.readFileSync(
//       "./data/ls/dirs/Boyce W.,DiPrima R. Elementary Differential Equations and Boundary Value Problems 10ed 2012 9780470458310.json",
//       "utf8"
//     )
//   );
//   function fileList() {
//     return fs.readdirSync("./ls/");
//   }
//   function hasFile(id: string) {
//     return fileList().includes(`${id}.png`);
//   }
//   function processFile(obj: PageObj, tries: number = 0): Promise<any> {
//     return new Promise<void>(async (resolve, reject) => {
//       const { isbn_c_p, link } = obj;
//       if (hasFile(isbn_c_p)) {
//         return resolve();
//       }
//       console.log("processing:", isbn_c_p);
//       try {
//         const response = await preview(link);
//         const fp = `./data/ls/files/${isbn_c_p.split("_")[0]}/${isbn_c_p}.png`;
//         if (response.started) {
//           fs.writeFileSync(fp, await response.data);
//         } else {
//           const writableStream = fs.createWriteStream(fp);
//           response.stream.pipe(writableStream);
//         }
//         console.log("done", isbn_c_p /*`${fileList().length}/${list.length}`*/);
//         resolve();
//       } catch (e) {
//         console.log("error:", isbn_c_p);
//         return resolve(await processFile(obj, tries + 1));
//       }
//     });
//   }
//   let i = 0;
//   const p = "./data/ls/files/9780470458310/";
//   try {
//     fs.mkdirSync(p);
//   } catch {}
//   // === CHECK FILES START ===
//   // const list2 = fs.readdirSync(p);
//   // const list2length = list2.length;
//   // for (let i2 = 0; i2 < list2length; i2++) {
//   //   const f = list2[i2];
//   //   try {
//   //     await jimp.read(`${p}${f}`);
//   //     console.log(`checked: ${i2 + 1} / ${list2length}`);
//   //   } catch (e) {
//   //     const isbn_c_p = f.substring(0, f.length - 4);
//   //     for (const fobj of list) {
//   //       if (fobj.isbn_c_p === isbn_c_p) {
//   //         setTimeout(() => processFile(fobj), 100 * i++);
//   //         break;
//   //       }
//   //     }
//   //   }
//   // }
//   // console.log("Check Done!");
//   // === CHECK FILES END ===
//   // WARNING: PROCESS FILES HERE !!!
//   // === PROCESS FILES START ===
//   // for (const obj of list) {
//   //   setTimeout(() => processFile(obj), 100 * i++);
//   // }
//   // console.log("Process Done!");
//   // === PROCESS FILES END ===
// })();
