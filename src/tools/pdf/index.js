import PdfPrinter from "pdfmake";
import axios from "axios";
import { pipeline } from "stream"
import { promisify } from "util"
import moment from "moment";

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
    const  startDate = moment(experience[0].startDate).format('YYYY-MM-DD')
    const  endDate = moment(experience[0].endDate).format('YYYY-MM-DD')
    console.log(startDate)
      console.log(experience)
      let expArr=experience.map(e=>{
        [ {text:"role: ",fontSize: 15,bold:true	},
        {text:experience.role+'\n',fontSize:12},
        {text:"Company: ",fontSize: 15,bold:true	},
        {text:experience.company+'\n',fontSize:12},
        {text:"Start Date: ",fontSize: 15,bold:true	},
        {text:experience.startDate+'\n',fontSize:12},
        {text:"End Date: ",fontSize: 15,bold:true	},
        {text:experience.endDate+'\n',fontSize:12},
        {text:"Summary: ",fontSize: 15,bold:true	},
        {text:experience.description+'\n',fontSize:12},
        ]
        
      })
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
            {margin: [0, 0, 0, 40],  text:[
                {text:"Area: ",fontSize: 20,bold:true	},
                {text:profile.area,fontSize:15}
                ] 
            },
            {text:"Experience "+'\n\n',fontSize: 20,bold:true,alignment:'center'	},
            /* experience.map(e=>{ */
               { text:[ {text:"Role: ",fontSize: 15,bold:true	},
                {text:experience[0].role+'\n\n',fontSize:15},]},
                {text:[{text:"Company: ",fontSize: 15,bold:true	},
                {text:experience[0].company+'\n\n',fontSize:15}]},
                {text:[{text:"Start Date: ",fontSize: 15,bold:true	},
                {text:startDate+'\n\n',fontSize:15}]},
               { text:[{text:"End Date: ",fontSize: 15,bold:true	},
                {text:endDate+'\n\n',fontSize:15}]},
               { text:[{text:"Summary: ",fontSize: 15,bold:true	},
                {text:experience[0].description+'\n',fontSize:15}]},
                
                
             /*  } */
            
    
          ],
      }

      const pdfDoc = printer.createPdfKitDocument(docDefinition);
  
      return pdfDoc;
  }