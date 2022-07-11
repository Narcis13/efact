const fs = require('fs');
const zlib = require('zlib');

const directoryFiles = fs.readdirSync('./');

const AdmZip = require("adm-zip");
const path = require("path");

async function extractArchive(filepath) {
  try {
    const zip = new AdmZip(filepath);
    const outputDir = `./`;
    zip.extractAllTo(outputDir,true);

    console.log(`Extracted to "${outputDir}" successfully`);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}

directoryFiles.map(fisier=>{
  if (fisier.substr(fisier.length - 3)==='zip'){
    extractArchive(fisier);
  }
})
