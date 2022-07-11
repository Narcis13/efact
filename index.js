const fs = require('fs');
const fsPromises =require('fs/promises')

const directoryFiles = fs.readdirSync('./primite/');


const AdmZip = require("adm-zip");
const path = require("path");

async function extractArchive(filepath) {
  try {
    //console.log(filepath)
    const zip = new AdmZip(filepath);
    const outputDir = `./prelucrate/`;
  
    zip.extractAllTo(outputDir,true);

    console.log(`Extracted to "${outputDir}" successfully`);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}


const emptyFolder = async (folderPath) => {
  try {
      // Find all files in the folder
      const files = await fsPromises.readdir(folderPath);
      for (const file of files) {
          await fsPromises.unlink(path.resolve(folderPath, file));
          console.log(`${folderPath}/${file} has been removed successfully`);
      }
      directoryFiles.map(fisier=>{
        if (fisier.substr(fisier.length - 3)==='zip'){
          let f = path.join('./primite/', fisier)
         // console.log(f)
          extractArchive(f);
        }
      })

      const fisiereDePrelucrat = fs.readdirSync('./prelucrate/');

      fisiereDePrelucrat.map(fp=>{
     
       if (fp.substr(fp.length - 3)==='xml' && fp.slice(0,4)!=="semn"){
         let fis = path.join('./prelucrate/', fp)
         console.log(fis)
        
       }
      })


  } catch (err){
      console.log(err);
  }
}
var folder = './prelucrate/';
   
/*fs.readdir(folder, (err, files) => {
  if (err) throw err;
  
  for (const file of files) {
      console.log(file + ' : File Deleted Successfully.');
      fs.unlinkSync(folder+file);
  }
  
});*/

 emptyFolder(folder);




