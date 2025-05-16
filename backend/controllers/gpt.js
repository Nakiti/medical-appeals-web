import OpenAI from "openai";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import busboy from 'busboy';
// import * as tesseract from 'tesseract.js';
import Tesseract from "tesseract.js";
import PDFDocument from "pdfkit"

const openai = new OpenAI({
    apiKey: "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"
});

export const extractData = (req, res) => {
   const bb = busboy({ headers: req.headers });
   let fileBuffer = Buffer.alloc(0);
   const files = []
   
   console.log("yppsdf")
   // console.log(req.body)

   bb.on('file', (fieldname, file, filename) => {
      
      file.on('data', (data) => {
         fileBuffer = Buffer.concat([fileBuffer, data]);
      });

      file.on('end', () => {
         files.push({buffer: fileBuffer, mimetype: filename.mimeType})
         console.log(`File [${fieldname}] finished`);
      });
   });

   bb.on('finish', async () => {
      try {
         const extractedTexts = []
         console.log("files", files)

         for (const {buffer, mimetype} of files) {
            console.log("files", buffer, mimetype)

            if (mimetype == "application/pdf") {
               const pdfUint8Array = new Uint8Array(buffer);
               const loadingTask = pdfjsLib.getDocument(pdfUint8Array);
               const pdfDocument = await loadingTask.promise;
               let extractedText = '';

               for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
                  const page = await pdfDocument.getPage(pageNum);
                  const textContent = await page.getTextContent();

                  textContent.items.forEach(item => {
                     extractedText += item.str + ' ';
                  });
               }

               extractedTexts.push(extractedText);
               console.log("pdf ran")
            } else if (mimetype.startsWith('image/')) {
               console.log("ran hjere")
               console.log(mimetype)
               const base64Image = `data:${mimetype};base64,${buffer.toString('base64')}`;
               const { data: { text } } = await Tesseract.recognize(base64Image);
               extractedTexts.push(text.replace(/(\w)\n(\w)/g, '$1 $2').replace(/\n/g, ' ').trim());
            } else {
               console.log(`Unsupported file type: ${mimetype}`);
            }
         }
         console.log("what")


         // Send extracted text to OpenAI
         // console.log(extractedTexts)
         const textString = extractedTexts.join()
         console.log("the text:", textString)

         const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
               { role: "user", 
                  content: 
                  `
                  Extract the following fields from the denial letter:
                  - First Name
                  - Last Name
                  - Date of Birth
                  - Insurance Provider
                  - Insurance Address
                  - Physician Name
                  - Physician Address
                  - Policy Number
                  - Procedure Name
                  - Denial Reason
                  Format the response as a JSON string with keys firstName, lastName, dob, insuranceProvider, insuranceAddress, physicianName, physicianAddress, policyNumber, procedureName, denialReason   
                  
                  ${textString}` 
               }
            ],
         });

         res.json(completion.choices[0].message.content);
         console.log(completion.choices[0].message.content);
      } catch (error) {
         console.error("Error processing file:", error);
         res.status(500).json({ error: "Error processing file" });
      }
   });

   req.pipe(bb);
};

export const writeAppealLetter = async(req, res) => {

   console.log("writing")

   try {
      const completion = await openai.chat.completions.create({
         model: "gpt-4.0",
         messages: [
            {
               role: "user",
               content: `
               You are a professional medical appeals assistant writing a formal appeal letter in response to a denial from an insurance company. Use the following patient and denial information to generate a complete, persuasive, and well-formatted appeal letter.
               
               Details:
               - Patient Name: ${req.body.firstName} ${req.body.lastName}
               - Date of Birth: ${req.body.dob}
               - Claim Number: ${req.body.claimNumber}
               - Policy Number: ${req.body.policyNumber}
               - Insurance Provider Name: ${req.body.insuranceProvider}
               - Insurance Provider Address: ${req.body.insuranceAddress}
               - Physician Name: ${req.body.physicianName}
               - Physician Address: ${req.body.physicianAddress}
               - Procedure Name: ${req.body.procedureName}
               - Denial Reason: ${req.body.denialReason}
               - Additional Details: ${req.body.additionalDetails}
               - Appealer Name: ${req.body.appealerFirstName} ${req.body.appealerLastName}
               - Appealer Address: ${req.body.appealerAddress}
               - Appealer Email: ${req.body.appealerEmailAddress}
               - Appealer Phone: ${req.body.appealerPhoneNumber}
               - Appealer Relation: ${req.body.appealerRelation}
               
               Instructions:
               - Begin the letter with the current date and a formal salutation to the insurance provider.
               - Clearly state the purpose of the letter: to appeal the denial of coverage for the procedure.
               - Summarize the medical background and need for the procedure in 1-2 paragraphs.
               - Address and respectfully refute the denial reason using medical rationale or new evidence (based on "Additional Details").
               - Include a closing statement requesting reconsideration, and offer to provide further information.
               - Use formal tone and professional structure. Format the letter for printing if needed.

               The entire letter should sound like it came from the patient or their authorized representative (e.g., physician or caregiver).
               Return only the letter content. No extra commentary.
               `
            }
         ]
      })

      const letterText = completion.choices[0].message.content

      const doc = new PDFDocument()
      let buffers = []

      doc.on("data", buffers.push.bind(buffers))
      doc.on("end", () => {
         const pdfData = Buffer.concat(buffers)

         res.setHeader("Content-Type", "application/pdf")
         res.setHeader("Content-Disposition", "attatchment; filename=appeal-letter.pdf")
         res.send(pdfData)
      })

      doc.font("Times-Roman").fontSize(12).text(letterText, {
         align: "left",
         lineGap: 6,
      });

      doc.end();
   } catch (err) {
      console.log(err)
   }
}
