import PdfPrinter from "pdfmake";
import axios from "axios";
import { pipeline } from "stream"
import { promisify } from "util"

const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const printer = new PdfPrinter(fonts); 
  export const generateProfileCVPDF = async (profile,experience) => {
      console.log(experience)
    const asyncPipeline = promisify(pipeline)
    let image = {};
    if (profile.image) {
        const response = await axios.get(profile.image, {
          responseType: "arraybuffer",
        });
        const profileCoverURLParts = profile.image.split("/");
        const fileName = profileCoverURLParts[profileCoverURLParts.length - 1];
        const [id, extension] = fileName.split(".");
        const base64 = response.data.toString("base64");
        const base64Image = `data:image/${extension};base64,${base64}`;
        image = { image: base64Image, width: 100, margin: [0, 0, 0, 20] };
    }
      const docDefinition={
          content:[
            {columns: [
                { margin: [0, 0, 0, 40], 
                text:[
                    {text:"Name: ",fontSize: 20,bold:true},{text:profile.name+'\n\n',fontSize: 20},
                    {text:"SurName: ",fontSize: 20,bold:true},{text:profile.surname+'\n\n',fontSize: 20},
                    {text:"Email: ",fontSize: 20,bold:true},{text:profile.email+'\n',fontSize: 20}
            ]
        },image
            ] 
        },
            {  margin: [0, 0, 0, 20], text:[
                {text:"Bio "+'\n\n',fontSize: 20,bold:true},
                {text:profile.bio,fontSize:15}
                ] 
            },
            { margin: [0, 0, 0, 20], text:[
                {text:"Title: ",fontSize: 20,bold:true},
                {text:profile.title,fontSize:15},
                ] 
            },
            {margin: [0, 0, 0, 20],  text:[
                {text:"Area: ",fontSize: 20,bold:true	},
                {text:profile.area,fontSize:15}
                ] 
            }    
          ],
      }

      const pdfDoc = printer.createPdfKitDocument(docDefinition);
  
      return pdfDoc;
  }