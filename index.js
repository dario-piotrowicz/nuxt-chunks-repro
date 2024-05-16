import { execSync } from "node:child_process";

const numOfBuilds = 3;

const chunkSets = new Array(numOfBuilds).fill(null).map(() => buildAndGetJsChunks());

console.log('');

chunkSets.forEach((chunks, i) => {
    console.log(`build ${i} produced the following _nuxt chunk files: \x1b[36m ${
        chunks.join(', ')
    }\x1b[0m`);
})

console.log('');

console.log(`\x1b[31m👆⚠️ Notice how the chunks are always different!\x1b[0m`);

function buildSync() {
    console.log("running `npm run build`...");
    execSync("npm run build");
}

function getUnderscoreNuxtChunks() {
    const ls = execSync("ls dist/_nuxt");
    return `${ls}`.split('\n');
}

function buildAndGetJsChunks() {
    buildSync();
    const underscoreNuxtChunks = getUnderscoreNuxtChunks();
    return underscoreNuxtChunks.filter(chunk => chunk.endsWith(".js"));
}
