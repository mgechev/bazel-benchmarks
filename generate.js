const fs = require('fs');
const now = new Date();

const numFiles = parseInt(process.argv[2]);
if (!numFiles) {
  throw new Error("number of files?");
}

const generateIndex = process.argv[3];

console.log(`Generating ${numFiles} source files...`);
for (i = 0; i < numFiles; i++) {
  const content = `export class Timer${i} { static createdAt() { return new Date('${now.toISOString()}'); } }`;
  path = `src/timer${i}.ts`;
  fs.writeFileSync(path, content, {encoding: 'utf-8'});
}

if (generateIndex) {
  console.log('Generating index.ts...');
  let index = ``;
  for (i = 0; i < numFiles; i++) {
    index += `import { Timer${i} } from './timer${i}';\n`;
  }
  index += `let updatedAt: Date = Timer0.createdAt();\n`
  for (i = 1; i < numFiles; i++) {
    index += `updatedAt = Timer${i}.createdAt() > updatedAt ? Timer${i}.createdAt() : updatedAt;\n`;
  }
  index += `
    console.log("Num files", ${numFiles});
    console.log("Updated at", updatedAt.toISOString());
    const now = new Date();
    console.log("Now", now.toISOString());
    console.log("RTT (ms)", now.getTime() - updatedAt.getTime());
  `;
  fs.writeFileSync('src/index.ts', index, {encoding: 'utf-8'});
}
