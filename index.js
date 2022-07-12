const fs = require('fs');
const fsPromises =require('fs/promises')

const directoryFiles = fs.readdirSync('./primite/');


const AdmZip = require("adm-zip");
const path = require("path");

const xml2js = require('xml2js');

const parser = new xml2js.Parser({ attrkey: "ATTR" });


async function extractArchive(filepath) {
  try {
    //console.log(filepath)
    const zip = new AdmZip(filepath);
    const outputDir = `./prelucrate/`;
  
    zip.extractAllTo(outputDir,true);

   // console.log(`Extracted to "${outputDir}" successfully`);
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
         // console.log(`${folderPath}/${file} has been removed successfully`);
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
         //console.log(fis,fp)
         let xml_string = fs.readFileSync(fis, "utf8");
         parser.parseString(xml_string, function(error, result) {
          if(error === null) {
              //console.log(result.Invoice['cbc:ID'][0],result.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyName'][0]['cbc:Name'][0]);
              let nrfact=typeof result.Invoice['cbc:ID'][0]=="string"?result.Invoice['cbc:ID'][0]:result.Invoice['cbc:ID'][0]['_']
              let reg_name=!result.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyName']&&result.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:RegistrationName'][0]
              let numefurnizor=result.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyName']?result.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyName'][0]['cbc:Name'][0]:typeof reg_name =="string"?reg_name:reg_name['_'];
             let numefisier=numefurnizor+'_'+nrfact;
            //  console.log(result.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0],numefisier)
              fs.rename(fis, path.join('./prelucrate/', numefisier+'.xml'), function(err) {
                if ( err ) console.log('ERROR: ' + err);
            });
          }
          else {
              console.log(error);
          }
      });

        
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




