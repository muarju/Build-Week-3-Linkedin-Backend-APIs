import PdfPrinter from "pdfmake";
import striptags from "striptags";
import axios from "axios";

const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const printer = new PdfPrinter(fonts); 
  export const generateProfileCVPDF = async (profile) => {
    /* let imagePart = {};
    if (profile.image) {
        const response = await axios.get(profile.image, {
          responseType: "arraybuffer",
        });
        const profileCoverURLParts = profile.cover.split("/");
        const fileName = profileCoverURLParts[profileCoverURLParts.length - 1];
        const [id, extension] = fileName.split(".");
        const base64 = response.data.toString("base64");
        const base64Image = `data:image/${extension};base64,${base64}`;
        imagePart = { image: base64Image, width: 500, margin: [0, 0, 0, 40] };
    } */
      const docDefinition={
          content:[
                {  text:"Name: "+profile.name,fontSize:20,lineHeight:1.5 /* margin:[0,0,0,20] */},
                {  text:"Surname: "+profile.surname,fontSize:20,lineHeight:1.5/* bold:true, margin:[0,0,0,20] */},
                {  text:"Email: "+profile.email,fontSize:20,lineHeight:1.5 /* margin:[0,0,0,20] */},
                {  text:"Bio: "+profile.bio,fontSize:20,lineHeight:1.5 /* margin:[0,0,0,20] */},
                {  text:"Title: "+profile.title,fontSize:20,lineHeight:1.5 /* margin:[0,0,0,20] */},
                {  text:"Area: "+profile.area,fontSize:20,lineHeight:1.5 /* margin:[0,0,0,20] */},
                
          ],
      }

      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      return pdfDoc;
  }